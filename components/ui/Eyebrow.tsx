interface Props { text: string; className?: string; }

export function Eyebrow({ text, className }: Props) {
  return (
    <div
      className={className}
      style={{
        fontSize: 10, fontWeight: 700, letterSpacing: ".2em",
        textTransform: "uppercase", color: "var(--tl)", marginBottom: 6,
      }}
    >
      {text}
    </div>
  );
}
