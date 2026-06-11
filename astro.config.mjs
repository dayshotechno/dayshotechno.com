// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://dayshotechno.com",
  output: "static",
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
  build: {
    inlineStylesheets: "auto",
  },
});
