interface Theme { label: string; days?: string; color: string; }
interface Props { theme: Theme; showDays?: boolean; }

export function ThemeBadge({ theme, showDays }: Props) {
  const label = showDays && theme.days
    ? `${theme.label} · ${theme.days}`
    : theme.label;

  return (
    <span
      style={{
        fontSize: 10, fontWeight: 700, letterSpacing: ".06em",
        textTransform: "uppercase", padding: "3px 10px",
        borderRadius: 20,
        background: `${theme.color}18`,
        color: theme.color,
        border: `1px solid ${theme.color}40`,
      }}
    >
      {label}
    </span>
  );
}
