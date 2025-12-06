import { ButtonProps } from "@/components/atoms/Button";
import { useState, useTransition } from "react";
import { peopleService } from "@/services/peopleService";
import { Person } from "@/types/people";

export const useSearch = () => {
  const [isPending, startTransition] = useTransition();
  const [searchType, setSearchType] = useState("people");
  const [query, setQuery] = useState("");
  const [list, setList] = useState<Person[]>([]);
  const isDisabled = query.trim().length < 2;

  const onSearch = async () => {
    if (!query) {
      setList([]);
      return;
    }
    try {
      const response = await peopleService.searchPeople(query.trim());
      setList(response.results);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    searchType,
    setSearchType: (value: string) => {
      setQuery("");
      setSearchType(value);
    },
    query,
    setQuery: (value: string) => setQuery(value),
    isDisabled,
    onClickSearch: () => {
      startTransition(onSearch);
    },
    isSearching: isPending,
    results: list,
  };
};
