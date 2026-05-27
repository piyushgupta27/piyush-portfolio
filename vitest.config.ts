import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    coverage: {
      provider: "v8",
      include: [
        "src/app/layout.tsx",
        "src/components/sections/contact.tsx",
        "src/components/ui/icons.tsx",
      ],
      reporter: ["text", "json-summary"],
    },
  },
});
