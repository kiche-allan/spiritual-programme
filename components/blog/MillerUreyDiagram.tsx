// Simple, theme-neutral diagram of the 1953 Miller-Urey apparatus.
export function MillerUreyDiagram() {
  const ink = "#2B2118";
  const muted = "#6B5D50";
  const water = "#7FA8C9";
  return (
    <figure style={{ margin: "28px 0" }}>
      <svg
        viewBox="0 0 360 300"
        role="img"
        aria-labelledby="mu-title mu-desc"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <title id="mu-title">The Miller-Urey experiment, 1953</title>
        <desc id="mu-desc">
          A closed loop of glass. Water boils in a flask at the bottom left. Steam rises with methane, ammonia and
          hydrogen into a large flask at the top where electric sparks pass between two electrodes. A condenser
          cools the gases, and the liquid collects in a trap below where amino acids are found.
        </desc>
        {/* loop */}
        <path d="M70 250 V150 Q70 60 150 60 H210" fill="none" stroke={ink} strokeWidth="3" />
        <path d="M290 100 V230 Q290 262 258 262 H130" fill="none" stroke={ink} strokeWidth="3" />
        {/* boiling flask */}
        <circle cx="70" cy="270" r="34" fill="none" stroke={ink} strokeWidth="3" />
        <path d="M44 270 a28 28 0 0 0 52 0 Z" fill={water} opacity="0.7" />
        {/* spark chamber */}
        <circle cx="250" cy="70" r="42" fill="none" stroke={ink} strokeWidth="3" />
        <path d="M232 70 H246 L240 82 L262 62 L252 62 L258 50" fill="none" stroke="#A63D24" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="232" cy="70" r="3" fill={ink} />
        <circle cx="262" cy="50" r="3" fill={ink} />
        {/* condenser */}
        <rect x="270" y="150" width="40" height="64" rx="6" fill="none" stroke={ink} strokeWidth="3" />
        <path d="M278 160 h24 M278 172 h24 M278 184 h24 M278 196 h24" stroke={water} strokeWidth="3" />
        {/* trap */}
        <path d="M120 262 q0 20 16 20 h-10" fill="none" stroke={ink} strokeWidth="3" />
        {/* labels */}
        <g fontFamily="system-ui, sans-serif" fontSize="12" fill={ink}>
          <text x="6" y="226">1 Water boils</text>
          <text x="6" y="130">2 Gases rise</text>
          <text x="140" y="24">3 Sparks</text>
          <text x="196" y="132">4 Cooled</text>
          <text x="150" y="294" fill={ink}>5 Amino acids collect</text>
        </g>
        <text x="6" y="244" fontSize="11" fill={muted} fontFamily="system-ui, sans-serif">(methane, ammonia, hydrogen)</text>
      </svg>
      <figcaption style={{ fontSize: 14, color: muted, marginTop: 8, lineHeight: 1.5 }}>
        The 1953 Miller-Urey apparatus: water vapour and gases circulate past electric sparks. Amino acids appeared,
        but a living cell did not. Simplified illustration.
      </figcaption>
    </figure>
  );
}
