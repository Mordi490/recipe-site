import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

export async function GET(context) {
  const oppskrifter = await getCollection("oppskrifter");
  return rss({
    title: "bentes Oppskrifter",
    description: "En samling av oppskrifter",
    site: context.site,
    stylesheet: "/rss.xsl",
    items: oppskrifter.map((o) => ({
      title: o.data.title,
      link: `/oppskrifter/${o.id}`,
      content: sanitizeHtml(parser.render(o.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
    customData: `<language>no</language>
      <image>
        <url>${context.site}preview-image.png</url>
        <title>Bentes Oppskrifter</title>
        <link>${context.site}</link>
      </image>
    `,
  });
}
