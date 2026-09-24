"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

// Initialized at module scope (not in a useEffect) so it runs before any
// descendant's mount effect can call posthog.capture() — React fires child
// effects before parent effects, so an effect here would race PostViewTracker.
if (typeof window !== "undefined" && !posthog.__loaded) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    capture_pageview: false,
    capture_pageleave: true,
    persistence: "localStorage",
    disable_session_recording: process.env.NODE_ENV === "development",
    loaded: (ph) => {
      if (process.env.NODE_ENV === "development") {
        ph.debug();
      }
    },
  });
}

export function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
