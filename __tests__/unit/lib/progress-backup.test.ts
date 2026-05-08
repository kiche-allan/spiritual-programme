import { exportProgress, importProgress } from "@/lib/progress-backup";

// Mock the DOM's URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => "blob:mock-url");
global.URL.revokeObjectURL = jest.fn();

describe("exportProgress", () => {
  it("triggers a file download without throwing", () => {
    // Set up some progress to export
    localStorage.setItem("spp_v1", JSON.stringify({ "1": { "1": true } }));

    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});

    expect(() => exportProgress()).not.toThrow();
    expect(clickSpy).toHaveBeenCalled();

    clickSpy.mockRestore();
  });
});

describe("importProgress", () => {
  const makeFile = (content: object) =>
    new File([JSON.stringify(content)], "backup.json", { type: "application/json" });

  it("imports a valid v1 backup file", async () => {
    const backup = {
      version: 1,
      exportedAt: new Date().toISOString(),
      progress: { "1": { "1": true, "2": true } },
    };

    const result = await importProgress(makeFile(backup));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.weeksImported).toBe(1);
  });

  it("imports a raw progress store without version wrapper", async () => {
    const raw = { "1": { "1": true }, "2": { "3": true } };
    const result = await importProgress(makeFile(raw));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.weeksImported).toBe(2);
  });

  it("rejects invalid JSON", async () => {
    const bad = new File(["not json at all {{{"], "backup.json", { type: "application/json" });
    const result = await importProgress(bad);
    expect(result.ok).toBe(false);
  });

  it("rejects files where progress is an array instead of object", async () => {
    const bad = { version: 1, progress: [1, 2, 3] };
    const result = await importProgress(makeFile(bad));
    expect(result.ok).toBe(false);
  });

  it("merges imported data with existing progress rather than overwriting", async () => {
    // Existing progress
    localStorage.setItem("spp_v1", JSON.stringify({ "1": { "1": true } }));

    const backup = { version: 1, progress: { "2": { "1": true } } };
    await importProgress(makeFile(backup));

    const stored = JSON.parse(localStorage.getItem("spp_v1") ?? "{}");
    // Both week 1 and week 2 should be present
    expect(stored["1"]["1"]).toBe(true);
    expect(stored["2"]["1"]).toBe(true);
  });
});
