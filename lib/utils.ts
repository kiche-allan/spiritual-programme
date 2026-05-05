// lib/utils.ts
// Shared utility functions used across the app

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function scrollToContent() {
  window.scrollTo({ top: 260, behavior: "smooth" });
}
