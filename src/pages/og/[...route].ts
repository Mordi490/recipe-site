import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";

const recipes = await getCollection("oppskrifter");
const recipePages = Object.fromEntries(
  recipes.map((recipe) => [
    recipe.id,
    {
      // remember to replace "-" with " "
      title: recipe.data.title.replace("-", " "),
      description: `oppskrift for ${recipe.data.title}`,
    },
  ]),
);

// og-images for index/ opskrifter/x and /about
const staticPages = {
  index: {
    title: "Bentes Oppskrifter",
    description: "arkiv av oppskrifter",
  },
  about: {
    title: "Bentes Oppskrifter",
    description: "om siden",
  },
  oppskrifter: {
    title: "Bentes Oppskrifter",
    description: "liste over alle oppskrifter",
  },
  search: {
    title: "Bentes Oppskrifter",
    description: "søk etter oppskrift",
  },
};

const pages = {
  ...recipePages,
  ...staticPages,
};

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (path, page) => {
    return {
      title: page.title,
      description: page.description,
      bgImage: {
        path: "./public/preview-image-60-opacity.png",
        fit: "cover",
      },
      format: "PNG",
      font: {
        title: {
          families: ["Inter Variable"],
          color: [255, 255, 255],
          size: 80,
          weight: "SemiBold",
        },
        description: {
          families: ["Inter Variable"],
          color: [230, 230, 230],
          size: 30,
          lineHeight: 12,
        },
      },
      padding: 80,
      fonts: ["./public/fonts/InterVariable.ttf"],
    };
  },
});
