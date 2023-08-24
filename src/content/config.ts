import { defineCollection, z } from "astro:content";

const oppskrifter = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    ingredienser: z.array(z.string()),
    heroImage: z.string().optional(),
  }),
});

export const collections = { oppskrifter };
