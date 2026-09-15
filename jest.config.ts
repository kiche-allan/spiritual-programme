import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const SUBSET_TEST_FLAGS = [
  "--findRelatedTests",
  "--runTestsByPath",
  "--selectProjects",
  "--shard",
  "--testNamePattern",
  "--testPathPattern",
  "--testPathPatterns",
];

const isSubsetTestArg = (arg: string) => SUBSET_TEST_FLAGS.some(
  (flag) => arg === flag || arg.startsWith(`${flag}=`)
);

const hasCoverageFlag = process.argv.some(
  (arg) => arg === "--coverage" || arg.startsWith("--coverage=")
);

const isSubsetCoverageRun = hasCoverageFlag
  && process.argv.some(isSubsetTestArg);

const config: Config = {
  coverageProvider: "v8",

  // Separate projects for unit (jsdom) and integration (node) tests
  projects: [
    {
      displayName: "unit",
      testEnvironment: "jsdom",
      testMatch: ["**/__tests__/unit/**/*.test.ts?(x)"],
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
      },
      transform: {
        "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
      },
    },
    {
      displayName: "integration",
      testEnvironment: "node",
      testMatch: ["**/__tests__/integration/**/*.test.ts"],
      setupFilesAfterEnv: ["<rootDir>/jest.setup.integration.ts"],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
      },
      transform: {
        "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
      },
    },
  ],

  ...(!isSubsetCoverageRun && {
    coverageThreshold: {
      global: {
        branches: 70,
        functions: 75,
        lines: 75,
        statements: 75,
      },
    },
  }),

  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}",
    "hooks/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
};

export default createJestConfig(config);
