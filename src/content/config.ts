import { defineCollection, z } from "astro:content";

const oppskrifter = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tags: z.array(z.string()),
      tattFra: z.string().optional(),
      ingredienser: z.array(z.string()),
      heroImage: image().array().optional(),
    }),
});

export const collections = { oppskrifter };
