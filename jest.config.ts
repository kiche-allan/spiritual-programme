import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const SUBSET_TEST_FLAGS = [
  "--findRelatedTests",
  "--runTestsByPath",
  "--selectProjects",
  "--shard",
  "--testPathPattern",
  "--testPathPatterns",
];

const isSubsetTestArg = (arg: string) => SUBSET_TEST_FLAGS.some(
  (flag) => arg === flag || arg.startsWith(`${flag}=`)
);

const FLAGS_WITH_FOLLOWING_VALUE = new Set([
  "--changedSince",
  "--config",
  "--coverageDirectory",
  "--coverageProvider",
  "--env",
  "--filter",
  "--globals",
  "--ignoreProjects",
  "--injectGlobals",
  "--maxWorkers",
  "--notifyMode",
  "--outputFile",
  "--preset",
  "--projects",
  "--reporters",
  "--resolver",
  "--roots",
  "--seed",
  "--setupFilesAfterEnv",
  "--shard",
  "--testEnvironment",
  "--testEnvironmentOptions",
  "--testFailureExitCode",
  "--testMatch",
  "--testPathIgnorePatterns",
  "--testPathPattern",
  "--testPathPatterns",
  "--testRunner",
  "--testSequencer",
  "--testTimeout",
  "--transform",
]);

const hasCoverageFlag = process.argv.some(
  (arg) => arg === "--coverage" || arg.startsWith("--coverage=")
);

const hasPositionalTestSelector = (() => {
  const cliArgs = process.argv.slice(2);

  for (let index = 0; index < cliArgs.length; index++) {
    const arg = cliArgs[index];

    if (isSubsetTestArg(arg)) {
      return true;
    }

    if (arg.startsWith("-")) {
      const flag = arg.split("=")[0];
      if (!arg.includes("=") && FLAGS_WITH_FOLLOWING_VALUE.has(flag)) {
        index++;
      }
      continue;
    }

    if (arg.includes("__tests__") || /\.(spec|test)\.[jt]sx?$/.test(arg)) {
      return true;
    }
  }

  return false;
})();

const isSubsetCoverageRun = hasCoverageFlag && hasPositionalTestSelector;

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
