"use client";

import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "gold" | "white" | "dark";
  className?: string;
  style?: React.CSSProperties;
}

const sizes = {
  sm: { wrap: "w-4 h-4", border: "border-2", dot: "w-1.5 h-1.5" },
  md: { wrap: "w-8 h-8", border: "border-2", dot: "w-2 h-2" },
  lg: { wrap: "w-12 h-12", border: "border-[3px]", dot: "w-3 h-3" },
};

const variants = {
  gold: {
    track: "border-[#E8C97A]/20",
    spin: "border-transparent border-t-[#E8C97A] border-r-[rgba(232,201,122,0.5)]",
    dot: "bg-[#E8C97A]",
  },
  white: {
    track: "border-white/20",
    spin: "border-transparent border-t-white border-r-white/40",
    dot: "bg-white",
  },
  dark: {
    track: "border-[#1A3A6E]/20",
    spin: "border-transparent border-t-[#1A3A6E] border-r-[#1A3A6E]/40",
    dot: "bg-[#1A3A6E]",
  },
};

export function Spinner({
  size = "md",
  variant = "gold",
  className,
  style,
}: SpinnerProps) {
  const s = sizes[size];
  const v = variants[variant];

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("relative flex-shrink-0", s.wrap, className)}
    >
      <div
        className={cn("absolute inset-0 rounded-full border", s.border, v.track)}
      />
      <div
        className={cn(
          "absolute inset-0 rounded-full border animate-spin",
          s.border,
          v.spin
        )}
        style={{
          animationDuration: "0.9s",
          animationTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
          ...style,
        }}
      />
      <div className={cn("absolute top-0.5 right-0.5 rounded-full", s.dot, v.dot)} />
    </div>
  );
}
