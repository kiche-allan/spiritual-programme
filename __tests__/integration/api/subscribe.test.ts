import { POST } from "@/app/api/subscribe/route";
import { NextRequest } from "next/server";

// Mock Supabase so tests don't hit the real database
jest.mock("@/lib/supabase", () => ({
  getServiceClient: () => ({
    from: () => ({
      upsert: jest.fn().mockResolvedValue({ error: null }),
    }),
  }),
}));

function makeRequest(body: object): NextRequest {
  return new NextRequest("http://localhost/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/subscribe", () => {
  it("returns 200 for a valid email", async () => {
    const res = await POST(makeRequest({ email: "allan@example.com" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });

  it("returns 400 for email without @ sign", async () => {
    const res = await POST(makeRequest({ email: "notanemail" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for missing email field", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it("returns 400 for empty string email", async () => {
    const res = await POST(makeRequest({ email: "" }));
    expect(res.status).toBe(400);
  });
});
