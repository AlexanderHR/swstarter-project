import { SEARCH_TYPE_PEOPLE } from "@/types";
import { apiClient } from "./api";
import { Movie, SearchResponse, Person } from "@/types";

export interface ISWService {
  search(query: string, type: SEARCH_TYPE_PEOPLE): Promise<SearchResponse>;
  getPerson(id: string): Promise<Person>;
  getMovie(id: string): Promise<Movie>;
}

export class SWService implements ISWService {
  async search(
    query: string,
    type: SEARCH_TYPE_PEOPLE
  ): Promise<SearchResponse> {
    const response = await apiClient.get<SearchResponse>(`/swapi/${type}`, {
      params: type === "films" ? { title: query } : { name: query },
    });
    return response.data;
  }

  async getPerson(id: string): Promise<Person> {
    const response = await apiClient.get<Person>(`/swapi/people/${id}`);
    return response.data;
  }

  async getMovie(id: string): Promise<Movie> {
    const response = await apiClient.get<Movie>(`/swapi/films/${id}`);
    return response.data;
  }
}

export const swService = new SWService();
