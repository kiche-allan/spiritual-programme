// TEMPORARY: delete this route and app/sentry-test once Sentry is verified.
export const dynamic = "force-dynamic";

export function GET() {
  throw new Error("Sentry test: server error");
}
