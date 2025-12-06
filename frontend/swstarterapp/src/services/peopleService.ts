import { apiClient } from "./api";
import { PeopleResponse } from "@/types/people";

export interface IPeopleService {
  searchPeople(query: string): Promise<PeopleResponse>;
}

export class PeopleService implements IPeopleService {
  async searchPeople(query: string): Promise<PeopleResponse> {
    const response = await apiClient.get<PeopleResponse>(`/people`, {
      params: { name: query },
    });
    return response.data;
  }
}

export const peopleService = new PeopleService();
