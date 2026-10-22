// components/blog/InlineMarkdown.tsx
import { Fragment, type ReactNode } from "react";

// **bold** / __bold__ first, then *italic* / _italic_. Underscore forms
// must sit on word boundaries so snake_case and similar stay literal.
// Built from a string: the tsconfig target predates lookbehind/named groups,
// but the runtime (Node, modern browsers) supports them.
const INLINE = new RegExp(
  String.raw`(?<![\w*])(?<d2>\*\*|__)(?=\S)(?<b>[\s\S]*?\S)\k<d2>(?![\w*])` +
  String.raw`|(?<![\w*\\])(?<d1>\*|_)(?=\S)(?<i>[\s\S]*?\S)\k<d1>(?![\w*])`
);

function parse(text: string, key = ""): ReactNode[] {
  const out: ReactNode[] = [];
  let rest = text;
  let n = 0;

  while (rest) {
    const m = INLINE.exec(rest);
    if (!m) { out.push(rest); break; }

    // `_` / `__` only count as emphasis when not flanked by word characters
    const g = m.groups!;
    const delim = g.d2 ?? g.d1;
    if (delim[0] === "_" && /\w/.test(rest[m.index - 1] ?? "")) {
      out.push(rest.slice(0, m.index + delim.length));
      rest = rest.slice(m.index + delim.length);
      continue;
    }

    if (m.index > 0) out.push(rest.slice(0, m.index));
    const k = `${key}${n++}`;
    out.push(
      g.d2
        ? <strong key={k}>{parse(g.b, `${k}-`)}</strong>
        : <em key={k}>{parse(g.i, `${k}-`)}</em>
    );
    rest = rest.slice(m.index + m[0].length);
  }

  return out;
}

export function InlineMarkdown({ text }: { text: string }) {
  return <Fragment>{parse(text)}</Fragment>;
}
