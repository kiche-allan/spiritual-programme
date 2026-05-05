interface Props { label: string; color: string; }

export function SectionLabel({ label, color }: Props) {
  return (
    <div className="section-divider">
      <span style={{ color }}>{label}</span>
    </div>
  );
}
