interface Props { text: string; }

export function SectionTitle({ text }: Props) {
  return (
    <h2
      style={{
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontSize: "clamp(1.4rem,3vw,2rem)",
        fontWeight: 400, color: "var(--t1)", marginBottom: 20,
      }}
    >
      {text}
    </h2>
  );
}
