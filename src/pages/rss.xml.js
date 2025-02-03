import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import markdownit from "markdown-it";

const parser = markdownit();

export async function GET(context) {
  const oppskrifter = await getCollection("oppskrifter");
  return rss({
    title: "Bentes Oppskrifter",
    description: "En samling av oppskrifter",
    site: context.site,
    stylesheet: "/rss.xsl",
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    items: oppskrifter.map((o) => ({
      title: o.data.title,
      link: `/oppskrifter/${o.id}`,
      description: `Oppskrift for ${o.data.title}`,
      content: sanitizeHtml(parser.render(o.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        transformTags: {
          img: (tagName, attribs) => ({
            tagName: "img",
            attribs: {
              ...attribs,
              src: attribs.src
                ? new URL(attribs.src, context.site).toString()
                : attribs.src,
            },
          }),
        },
      }),
    })),
    customData: `<language>no</language>
      <atom:link href="${context.site}/rss.xml" rel="self" type="application/rss+xml" />
      <image>
        <url>${context.site}preview-image.png</url>
        <title>Bentes Oppskrifter</title>
        <link>${context.site}</link>
      </image>
    `,
  });
}
