import { defineConfig } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["src/tests/setup.ts"],
    fileParallelism: false,
    testTimeout: 30000,
    exclude: ["**/node_modules/**", "**/dist/**"],
  },
  resolve: {
    alias: {
      "@generated/prisma": path.resolve(__dirname, "./generated/prisma"),
    },
  },
});
