// file to hold any "global" data
export const title = "Bentes oppskrifter";
export const desc = "Arkiv av oppskrifter";
export const PER_PAGE = 70;
export const BASE_RECIPE_URL = import.meta.env.PROD
  ? "https://www.bentesoppskrifter.no"
  : "http://localhost:4321";
