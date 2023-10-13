import { defineCollection, z } from "astro:content";

const oppskrifter = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tags: z.array(z.string()),
      tattFra: z.string().optional(),
      ingredienser: z.array(z.string()),
      images: image().array().optional(),
      draft: z.boolean().optional(),
    }),
});

export const collections = { oppskrifter };
