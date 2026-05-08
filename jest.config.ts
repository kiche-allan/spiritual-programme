import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",

  // Separate environments for different test types
  projects: [
    {
      displayName: "unit",
      testMatch: ["**/__tests__/unit/**/*.test.ts?(x)"],
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    },
    {
      displayName: "integration",
      testMatch: ["**/__tests__/integration/**/*.test.ts"],
      testEnvironment: "node",  // node env for API route testing
    },
  ],

  // Coverage thresholds — this is what QA engineers set and defend
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

  // Map path aliases
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

export default createJestConfig(config);
