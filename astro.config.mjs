import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://www.bentesoppskrifter.no",
  integrations: [tailwind()],
  output: "hybrid",
  adapter: vercel(),
});
