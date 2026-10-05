import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "unit",
      testDir: "./src",
      testMatch: "**/*.test.ts",
    },
    {
      name: "desktop",
      testDir: "./e2e",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile",
      testDir: "./e2e",
      use: { ...devices["iPhone 13"] },
    },
  ],
  webServer: {
    command: process.env.CI ? "npm run build && npm run start" : "npm run dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
