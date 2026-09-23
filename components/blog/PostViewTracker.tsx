"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

interface Props {
  slug: string;
  title: string;
  series: string | null;
  tags: string[];
}

// Fires the view analytics event on mount; renders nothing itself so the
// article stays server-rendered static HTML.
export function PostViewTracker({ slug, title, series, tags }: Props) {
  useEffect(() => {
    trackEvent("blog.post.viewed", { slug, title, series, tags });
  }, [slug, title, series, tags]);

  return null;
}
