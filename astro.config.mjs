import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [rawFonts([`.ttf`])],
  },
  site: "https://www.bentesoppskrifter.no",
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: "no",
      },
    }),
    pagefind(),
  ],
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  imageService: true,
});

// Vite will try to optimize fonts, and it doesn't have to
function rawFonts(ext) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(_, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  };
}
