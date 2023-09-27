export function postPath(inputString: string) {
  return import.meta.env.PROD
    ? `oppskrifter/${inputString}`
    : `http://localhost:4321/oppskrifter/${inputString}`;
}
