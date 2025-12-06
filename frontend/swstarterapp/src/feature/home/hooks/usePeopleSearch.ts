import { useState, useCallback } from "react";
import { Person } from "@/types/people";
import { peopleService } from "@/services/peopleService";

interface UsePeopleSearchResult {
  people: Person[];
  isLoading: boolean;
  error: string | null;
  searchPeople: (query: string) => Promise<void>;
}

export const usePeopleSearch = (): UsePeopleSearchResult => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPeople = useCallback(async (query: string) => {
    if (!query.trim()) {
      setPeople([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await peopleService.searchPeople(query);
      setPeople(response.results);
    } catch (err) {
      setError("Failed to fetch people. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { people, isLoading, error, searchPeople };
};
