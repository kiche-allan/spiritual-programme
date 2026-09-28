"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, BookOpen, PenLine, BarChart3 } from "lucide-react";
import { WEEKS_META } from "@/lib/weeks";

const latestWeek = [...WEEKS_META].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
)[0];

const TABS = [
  { label: "Home", href: "/", icon: Home, match: (p: string) => p === "/" },
  { label: "This Week", href: `/week/${latestWeek.id}`, icon: BookOpen, match: (p: string) => p.startsWith("/week/") },
  { label: "Blog", href: "/blog", icon: PenLine, match: (p: string) => p.startsWith("/blog") },
  { label: "Progress", href: "/progress", icon: BarChart3, match: (p: string) => p.startsWith("/progress") },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden"
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: "var(--bg)", borderTop: "1px solid var(--border)",
        display: "flex", justifyContent: "space-around", alignItems: "stretch",
      }}
    >
      {TABS.map(tab => {
        const active = tab.match(pathname);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.label}
            href={tab.href}
            style={{
              flex: 1, minHeight: 56,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 3, textDecoration: "none",
              color: active ? "#E8C97A" : "var(--tl)",
            }}
          >
            <Icon size={20} strokeWidth={active ? 2.25 : 1.75} />
            <span style={{
              fontFamily: "Lato,sans-serif", fontSize: 10, fontWeight: 700,
              letterSpacing: ".04em",
            }}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
