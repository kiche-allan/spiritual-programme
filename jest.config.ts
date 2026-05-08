import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  displayName: "unit",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  testMatch: ["**/__tests__/**/*.test.ts?(x)"],

  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },

  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}",
    "hooks/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

export default createJestConfig(config);
