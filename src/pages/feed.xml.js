import rss from "@astrojs/rss";

export function GET(context) {
  return rss({
    title: "bentes Oppskrifter",
    description: "En samling av oppsrkifter",
    site: context.site,
    items: [],
    customData: "<lanugauge>no</lanugage>",
  });
}
