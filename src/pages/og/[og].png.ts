import satori from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import Inter from "../../../public/fonts/Inter-Regular.ttf";
import type { APIRoute } from "astro";

const SITE = import.meta.env.PROD
  ? "https://bentesoppskrifter.no"
  : "http://localhost:4321";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const { og } = params;
  const { origin } = new URL(request.url);
  const { searchParams } = new URL(request.url);
  const data = Object.fromEntries(searchParams.entries());
  data.url = origin;

  const template = html`<div tw="flex relative w-[1200px] h-[630px]">
    <img
      tw="absolute inset-0"
      src="${data.url}/preview-image.png"
      style="z-index: 0"
      width="1200"
      height="630"
    />
    <div
      tw="absolute inset-0 flex flex-col justify-center items-center text-white"
      style="z-index: 1; background-color: rgba(0,0,0,0.6)"
    >
      <h2 tw="text-7xl text-center font-bold">${og}</h2>
      <p tw="absolute bottom-12 inset-x-auto text-3xl opacity-80">
        Oppskrift for: ${og}
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

  return new Response(resvg.render().asPng(), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
