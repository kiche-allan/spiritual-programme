interface Props { pct: number; }

export function ProgressBar({ pct }: Props) {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
