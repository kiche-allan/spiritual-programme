"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    // global-error replaces the root layout, so it must render its own html/body
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          fontFamily: "Georgia, serif",
          background: "#0D1F3C",
          color: "#f5f0e6",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <h2 style={{ margin: 0, fontWeight: 500 }}>Something went wrong</h2>
        <p style={{ margin: 0, opacity: 0.8 }}>
          We hit an unexpected problem. Please try again.
        </p>
        <button
          onClick={() => retry()}
          style={{
            padding: "0.6rem 1.4rem",
            borderRadius: "0.5rem",
            border: "1px solid #f5f0e6",
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
