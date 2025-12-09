export type SEARCH_TYPE_PEOPLE = "people" | "films";

export interface SearchResponse {
  results: { uid: string; description: string }[];
}
export interface Person {
  uid: string;
  name: string;
  birth_year?: string;
  gender?: string;
  eye_color?: string;
  hair_color?: string;
  height?: string;
  mass?: string;
  films?: { id: string; title: string }[]; // URLs or titles depending on API
}
export interface Movie {
  id: string;
  title: string;
  opening_crawl: string;
  characters_id: string[];
  characters: { id: string; name: string }[];
}
