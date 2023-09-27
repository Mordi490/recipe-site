export function postPath(inputString: string) {
  return import.meta.env.PROD
    ? `bentesoppsrkifter.no/oppskrifter/${inputString}`
    : `http://localhost:4321/oppskrifter/${inputString}`;
}
