"use client";

// TEMPORARY: delete app/sentry-test and app/api/sentry-test once Sentry is verified.
export default function SentryTestPage() {
  return (
    <main style={{ padding: "2rem", display: "grid", gap: "1rem", maxWidth: 480 }}>
      <h1>Sentry test</h1>
      <button
        onClick={() => {
          throw new Error("Sentry test: client error");
        }}
      >
        Throw client error
      </button>
      <button
        onClick={async () => {
          await fetch("/api/sentry-test");
        }}
      >
        Trigger server error
      </button>
    </main>
  );
}
