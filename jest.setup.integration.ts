// jest.setup.integration.ts
// Setup for integration tests running in node environment
// Polyfill Web APIs that aren't available in Node.js

import { TextEncoder, TextDecoder } from "util";

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder as any;
}
if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder as any;
}

// Polyfill crypto API
if (!global.crypto) {
  const crypto = require("crypto");
  global.crypto = {
    getRandomValues: (arr: any) => crypto.randomBytes(arr.length),
    subtle: crypto.subtle,
  } as any;
}
