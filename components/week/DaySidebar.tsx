import type { DayContent } from "@/lib/content/types";

interface Props {
  days: DayContent[];
  current: number;
  progress: (dayNum: number) => boolean;
  onSelect: (index: number) => void;
  onToggle: (dayNum: number) => void;
}

export function DaySidebar({ days, current, progress, onSelect, onToggle }: Props) {
  return (
    <aside style={{
      width: 220, flexShrink: 0,
      padding: "2rem 0 2rem 1.5rem",
      position: "sticky", top: 60, height: "fit-content",
    }} className="hide-mobile">
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: ".18em",
        textTransform: "uppercase", color: "var(--tl)",
        marginBottom: 14, paddingLeft: 4,
      }}>
        Days
      </div>

      {days.map((d, i) => {
        const done = progress(d.num);
        const active = i === current;
        return (
          <button
            key={d.num}
            onClick={() => onSelect(i)}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              width: "100%", padding: "9px 10px", border: "none",
              background: active ? "var(--bg2)" : "transparent",
              cursor: "pointer", borderRadius: 8,
              textAlign: "left", marginBottom: 2,
              transition: "background .15s",
            }}
          >
            {/* Checkmark circle */}
            <div
              onClick={e => { e.stopPropagation(); onToggle(d.num); }}
              style={{
                width: 24, height: 24, borderRadius: "50%",
                border: done ? "none" : `1.5px solid ${active ? d.accent : "var(--border)"}`,
                background: done ? d.accent : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, cursor: "pointer", transition: "all .2s",
              }}
            >
              {done && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>

            <div>
              <div style={{
                fontSize: 12,
                fontWeight: active ? 700 : 400,
                color: active ? "var(--t1)" : "var(--t2)",
              }}>
                {d.name}
              </div>
              <div style={{ fontSize: 11, color: "var(--tl)" }}>
                {d.title.split(" ").slice(0, 4).join(" ")}
                {d.title.split(" ").length > 4 ? "…" : ""}
              </div>
            </div>
          </button>
        );
      })}
    </aside>
  );
}
