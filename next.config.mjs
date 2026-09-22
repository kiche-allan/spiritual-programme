import { withAxiom } from "next-axiom";
import { withSentryConfig } from "@sentry/nextjs/config";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
};

export default withSentryConfig(withAxiom(nextConfig), {
  org: "cmu-5k",
  project: "javascript-nextjs",
  // Source map upload needs SENTRY_AUTH_TOKEN; without it the build still succeeds.
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
});
