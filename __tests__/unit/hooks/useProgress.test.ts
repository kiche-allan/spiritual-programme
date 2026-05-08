import { renderHook, act } from "@testing-library/react";
import { useProgress } from "@/hooks/useProgress";

describe("useProgress", () => {
  it("starts with zero progress", () => {
    const { result } = renderHook(() => useProgress(1, 7));
    expect(result.current.doneCount).toBe(0);
    expect(result.current.pct).toBe(0);
  });

  it("toggles a day on", () => {
    const { result } = renderHook(() => useProgress(1, 7));
    act(() => { result.current.toggle(1); });
    expect(result.current.doneCount).toBe(1);
    expect(result.current.isDone(1)).toBe(true);
    expect(result.current.pct).toBe(14); // 1/7 = ~14%
  });

  it("toggles a day off after being on", () => {
    const { result } = renderHook(() => useProgress(1, 7));
    act(() => { result.current.toggle(1); }); // on
    act(() => { result.current.toggle(1); }); // off
    expect(result.current.doneCount).toBe(0);
    expect(result.current.isDone(1)).toBe(false);
  });

  it("persists progress to localStorage", () => {
    const { result } = renderHook(() => useProgress(2, 7));
    act(() => { result.current.toggle(3); });

    const stored = JSON.parse(localStorage.getItem("spp_v1") ?? "{}");
    expect(stored["2"]["3"]).toBe(true);
  });

  it("calculates percentage correctly for full completion", () => {
    const { result } = renderHook(() => useProgress(1, 7));
    act(() => {
      [1,2,3,4,5,6,7].forEach(d => result.current.toggle(d));
    });
    expect(result.current.pct).toBe(100);
    expect(result.current.doneCount).toBe(7);
  });
});
