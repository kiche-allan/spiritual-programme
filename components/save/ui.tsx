"use client";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sp-rust";
const btnBase =
  "inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] px-5 text-[16px] font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

export function PrimaryButton({ className, ...p }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...p} className={cn(btnBase, "bg-sp-rust text-white hover:bg-[#8f3320]", focus, className)} />;
}

export function SecondaryButton({ className, ...p }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...p}
      className={cn(btnBase, "border border-sp-line bg-sp-surface text-sp-ink hover:bg-sp-tint", focus, className)}
    />
  );
}

/** Text-style button with a 44px minimum touch target. */
export function TextButton({ className, ...p }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...p}
      className={cn("min-h-[44px] rounded-lg px-3 text-[15px] font-bold text-sp-muted underline-offset-4 hover:underline", focus, className)}
    />
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn("inline-flex min-h-[44px] items-center rounded-lg px-3 text-[15px] font-bold text-sp-muted underline underline-offset-4", focus, className)}
    >
      {children}
    </Link>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-sp-cream px-4 pb-28 pt-6 font-sans text-sp-ink">
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className={cn("mb-4 inline-flex min-h-[44px] items-center text-[14px] font-bold text-sp-muted", focus)}>
          ← Back to reading
        </Link>
        {children}
      </div>
    </main>
  );
}

export function Heading({ children }: { children: ReactNode }) {
  return <h1 className="font-serif text-[2rem] font-semibold leading-tight text-sp-ink">{children}</h1>;
}

export function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.5 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
      <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}
