import { NextRequest } from "next/server";

const getRequestUser = jest.fn();
jest.mock("@/lib/supabase/server", () => ({
  getRequestUser: (...a: unknown[]) => getRequestUser(...a),
}));
const deleteUser = jest.fn();
jest.mock("@/lib/supabase", () => ({
  getServiceClient: () => ({ auth: { admin: { deleteUser: (...a: unknown[]) => deleteUser(...a) } } }),
}));

import { POST } from "@/app/api/progress/sync/route";
import { DELETE } from "@/app/api/account/route";

function post(body: unknown, raw = false): NextRequest {
  return new NextRequest("http://localhost/api/progress/sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw ? (body as string) : JSON.stringify(body),
  });
}

function signedInAs(rows: unknown[]) {
  const upsert = jest.fn().mockResolvedValue({ error: null });
  const order2 = jest.fn().mockResolvedValue({ data: rows, error: null });
  const order1 = jest.fn().mockReturnValue({ order: order2 });
  const select = jest.fn().mockReturnValue({ order: order1 });
  getRequestUser.mockResolvedValue({
    user: { id: "u1" },
    client: { from: () => ({ upsert, select }) },
  });
  return { upsert };
}

beforeEach(() => { jest.clearAllMocks(); getRequestUser.mockResolvedValue(null); });

describe("POST /api/progress/sync", () => {
  it("401 when signed out", async () => {
    const res = await POST(post({ items: [{ week: 1, day: 1 }] }));
    expect(res.status).toBe(401);
  });

  it("400 for a bad body even when signed out", async () => {
    expect((await POST(post({}))).status).toBe(400);
  });

  it("400 for empty, invalid and non-JSON bodies (never 500)", async () => {
    signedInAs([]);
    for (const body of [{}, { items: [] }, { items: [{ week: 0, day: 1 }] }, { items: [{ week: 1, day: 8 }] }, { items: "x" }]) {
      expect((await POST(post(body))).status).toBe(400);
    }
    expect((await POST(post("not json", true))).status).toBe(400);
    expect((await POST(post("", true))).status).toBe(400);
  });

  it("400 when over 500 items", async () => {
    signedInAs([]);
    const items = Array.from({ length: 501 }, () => ({ week: 1, day: 1 }));
    expect((await POST(post({ items }))).status).toBe(400);
  });

  it("200 with the merged list, ignoring duplicates", async () => {
    const { upsert } = signedInAs([{ week: 1, day: 1, completed_at: "2026-01-01T00:00:00Z" }, { week: 1, day: 2, completed_at: "2026-01-02T00:00:00Z" }]);
    const res = await POST(post({ items: [{ week: 1, day: 1 }, { week: 1, day: 1 }] }));
    expect(res.status).toBe(200);
    expect((await res.json()).items).toHaveLength(2);
    expect(upsert).toHaveBeenCalledWith(
      [{ user_id: "u1", week: 1, day: 1 }],
      expect.objectContaining({ ignoreDuplicates: true })
    );
  });
});

describe("DELETE /api/account", () => {
  it("401 when signed out", async () => {
    const res = await DELETE(new NextRequest("http://localhost/api/account", { method: "DELETE" }));
    expect(res.status).toBe(401);
    expect(deleteUser).not.toHaveBeenCalled();
  });
  it("204 and deletes the user via the service client", async () => {
    getRequestUser.mockResolvedValue({ user: { id: "u1" }, client: {} });
    deleteUser.mockResolvedValue({ error: null });
    const res = await DELETE(new NextRequest("http://localhost/api/account", { method: "DELETE" }));
    expect(res.status).toBe(204);
    expect(deleteUser).toHaveBeenCalledWith("u1");
  });
});
