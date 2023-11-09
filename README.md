# Recipe Site

## TLDR

[FAFO](https://www.urbandictionary.com/define.php?term=FAFO) with [Astro](https://astro.build/)

## Long Version

This is site is primarily a achieve of recipes. The project aims to be a sensible and fast way of handling large amounts of static content, as of right now: 569 text documents and 614 images. The site is purposefully made for not tech-savvy, old & dyslexic people(eg. my mother). This means large text and and simple high contrast colors everywhere. Very dated and uninspiring, but very functional.

### Why Astro

Most of the pages just serve static content and Astro has emerged as one of the newer and more popular static site generators (SSG). Astro also provides nice features to manage collections such as type-safe front matter, and provide features that make implementing thins such as pagination and image optimizations easy.

Astro also gives a lot of headroom with the ability to opt-in and use larger JS frameworks such as react, vue, solid, lit and [more](https://docs.astro.build/en/guides/integrations-guide/#official-integrations). Astro is also trivial to deploy with SSR support on many of them, most notably CloudFlare, SST & Vercel.

#### Performance

#### Image Optimizations

The original images were saved as 3000x4000 jpg's (~3.5 mb). These were then converted to a more "reasonable" resolution, which in hindsight is still probably too large, via a [bash script](https://github.com/Mordi490/recipe-site/blob/main/resize-images.sh). This script converts the images to 1440x1920(~1 mb). These pictures are then feed to a custom image component that takes the image, converts it to avif and resizes it to have widths of 400, 700 and 900 and serves the correct one to the user. This means we end up with a ~42-200 kb avif image. This is done as build step.

#### Lighthouse Scores

Every page scores full 100's on lighthouse, except for the search page. The search page occasionally prints out a single console.error, or takes too long to fetch and has some layout shift if your query results in 50+ results.

This is somewhat excepted since I used [FuseJS](https://www.fusejs.io/) to have fuzzy search which is useful for dyslexic people who often type things incorrectly. So a lenient search is very much by design and the performance hit is expected. If you wanted a more performant solution a static search library like [PageFind](https://pagefind.app/) would be better.

Example of some Lighthouse scores

![Example of Lighthouse score on a paginated page](image-1.png)

![Example on a recipe](image-3.png)

Worst case scenario on search page

![Worst case Lighthouse score on search page](image.png)

More reasonable case on search page:

![Reasonable case on search page](image-2.png)
