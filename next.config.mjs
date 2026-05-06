import withPWA from "next-pwa";

const pwaConfig = withPWA({
  dest: "public", // service worker goes in /public
  disable: process.env.NODE_ENV === "development", // off in dev
  register: true, // auto-register the SW
  skipWaiting: true, // activate new SW immediately
  runtimeCaching: [
    {
      // Cache all page navigations
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "spiritual-programme-pages",
        expiration: { maxEntries: 50, maxAgeSeconds: 7 * 24 * 60 * 60 },
        networkTimeoutSeconds: 10,
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default pwaConfig(nextConfig);
