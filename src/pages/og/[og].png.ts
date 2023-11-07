import satori from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import Inter from "../../../public/fonts/Inter-Regular.ttf";
import type { APIRoute } from "astro";

let SITE = "";
import.meta.env.PROD
  ? (SITE = "https://bentesoppskrifter.no")
  : "localhost:4321";

export const prerender = false; // output is set to "hybrid"

export const GET: APIRoute = async ({ params, request }) => {
  const { og } = params;
  const { origin } = new URL(request.url);

  const { searchParams } = new URL(request.url);
  const data = Object.fromEntries(searchParams.entries());
  data.url = origin;

  console.log("searchParams: ", searchParams);
  console.log("data: ", data);
  console.log("data.url: ", data.url);

  // slug OG-template, used when frontmatter is present
  const template = html`<div tw="flex relative w-[1200px] h-[630px]">
    <img
      tw="absolute inset-0 z-0"
      src="${data.url}/preview-image.png"
      width="1200"
      height="630"
    />
    <div tw="flex absolute inset-0 z-1 bg-black bg-opacity-60"></div>
    <div
      tw="relative w-full h-full flex flex-col p-16 justify-center items-center text-white"
    >
      <h2 tw="text-7xl text-center font-bold">${og}</h2>
      <p tw="absolute bottom-12 inset-x-auto text-3xl opacity-80">
        Oppskrift for: ${og}
      </p>
    </div>
  </div>`;

  // TODO: revisit when you have better hardware
  const newTemplate = html` <div tw="flex relative w-[1200px] h-[630px]">
    <img tw="absolute inset-0 z-0" src="${data?.url}/_astro/${data?.image}" />
    <div tw="flex absolute inset-0 z-1 bg-black bg-opacity-60"></div>
    <div
      tw="relative w-full h-full flex flex-col p-16 justify-center items-center text-white"
    >
      <h1 tw="absolute top-12 inset-x-auto text-7xl">creatures.dev</h1>

      <h2 tw="text-6xl text-center">
        <pre>
      ${data?.title}
      ${searchParams}
      ${data}
      ${data.url}
      </pre>
      </h2>
      <p tw="absolute bottom-12 inset-x-auto text-3xl opacity-80">
        Oppskrift for: ${data?.title}
      </p>
    </div>
  </div>`;

  let svg = await satori(template, {
    fonts: [
      {
        name: "Inter",
        data: Buffer.from(Inter),
        style: "normal",
      },
    ],
    height: 630,
    width: 1200,
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });

  const image = resvg.render();

  return new Response(image.asPng(), {
    headers: {
      "Content-Type": "image/png",
      // optional
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
