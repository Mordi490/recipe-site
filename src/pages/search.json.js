import { getCollection } from "astro:content";

async function getOppskrifter() {
  const oppskrifter = await getCollection("oppskrifter");
  return oppskrifter.map((o) => ({
    slug: o.slug,
    title: o.data.title,
    ingredienser: o.data.ingredienser,
    tattFra: o.data.tattFra,
  }));
}

export async function GET({}) {
  return new Response(JSON.stringify(await getOppskrifter()), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
