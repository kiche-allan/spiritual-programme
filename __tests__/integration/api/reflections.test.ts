import { GET, POST } from "@/app/api/reflections/route";
import { NextRequest } from "next/server";

const mockReflections = [
  { id: "1", created_at: new Date().toISOString(), content: "This spoke to me deeply today.", display_name: "Allan", likes: 3 },
];

jest.mock("@/lib/supabase", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          eq: () => ({
            order: () => ({
              limit: () => Promise.resolve({ data: mockReflections, error: null }),
            }),
          }),
        }),
      }),
    }),
  },
  getServiceClient: () => ({
    from: () => ({
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: { id: "new-id" }, error: null }),
        }),
      }),
    }),
  }),
}));

describe("GET /api/reflections", () => {
  it("returns reflections for a valid week and day", async () => {
    const req = new NextRequest("http://localhost/api/reflections?weekId=1&dayNum=1");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.reflections)).toBe(true);
  });

  it("returns 400 when weekId is missing", async () => {
    const req = new NextRequest("http://localhost/api/reflections?dayNum=1");
    const res = await GET(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when dayNum is missing", async () => {
    const req = new NextRequest("http://localhost/api/reflections?weekId=1");
    const res = await GET(req);
    expect(res.status).toBe(400);
  });
});

describe("POST /api/reflections", () => {
  const makeRequest = (body: object) =>
    new NextRequest("http://localhost/api/reflections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

  it("accepts valid reflection", async () => {
    const res = await POST(makeRequest({
      weekId: 1, dayNum: 1,
      content: "This verse really spoke to me today and changed my perspective.",
      displayName: "Allan",
    }));
    expect(res.status).toBe(200);
  });

  it("rejects content shorter than 10 characters", async () => {
    const res = await POST(makeRequest({ weekId: 1, dayNum: 1, content: "Short" }));
    expect(res.status).toBe(400);
  });

  it("rejects content longer than 500 characters", async () => {
    const res = await POST(makeRequest({
      weekId: 1, dayNum: 1,
      content: "A".repeat(501),
    }));
    expect(res.status).toBe(400);
  });
});
