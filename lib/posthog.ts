import posthog from "posthog-js";

export { posthog };

export function initPostHog() {
  if (typeof window !== "undefined") {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",

      // Only track in production
      loaded: (posthog) => {
        if (process.env.NODE_ENV !== "production") {
          posthog.opt_out_capturing();
        }
      },
    });
  }
}
