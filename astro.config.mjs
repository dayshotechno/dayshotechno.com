// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://dayshotechno.com",
  output: "static",
  integrations: [tailwind({ applyBaseStyles: false })],
  build: {
    inlineStylesheets: "auto",
  },
});
