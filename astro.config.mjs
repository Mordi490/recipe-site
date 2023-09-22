import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// consider having a dark mode and a amoled mode
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter: vercel()
});