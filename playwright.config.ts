import { defineConfig, devices } from "@playwright/test";

const baseURL = "https://keval-h-my-portfolio.vercel.app/";

export default defineConfig({
  forbidOnly: Boolean(process.env.CI),
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  reporter: "list",
  testDir: "./e2e",
  use: { baseURL, trace: "on-first-retry" },
});
