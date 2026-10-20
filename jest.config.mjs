/** @type {import("jest").Config} */
const config = {
  clearMocks: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "text-summary", "lcov", "html"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/tests/**/*.test.ts", "<rootDir>/tests/**/*.test.tsx"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          esModuleInterop: true,
          isolatedModules: true,
          jsx: "react-jsx",
          module: "commonjs",
          moduleResolution: "node",
          strict: true,
          target: "ES2017",
        },
      },
    ],
  },
  transformIgnorePatterns: ["/node_modules/(?!(lucide-react|@radix-ui)/)"],
};

export default config;
