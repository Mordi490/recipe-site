import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// consider having a dark mode and a amoled mode
// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()]
});