import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    viewport: { width: 390, height: 844 },
    channel: "chrome",
    trace: "off",
  },
  projects: [
    {
      name: "Mobile Chrome 390px",
      use: {
        viewport: { width: 390, height: 844 },
        channel: "chrome",
      },
    },
  ],
});
