import { useQuery } from "@tanstack/react-query";
import { swService } from "@/services/swService";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useState, useTransition } from "react";
import { SEARCH_TYPE_PEOPLE } from "@/types";

export const useSearch = () => {
  const [searchType, setSearchType] = useQueryState("searchType", {
    defaultValue: "people",
  });
  const [query, setQuery] = useQueryState("query", {
    defaultValue: "",
  });
  const [executedQuery, setExecutedQuery] = useState(query);
  const [isPending, startTransition] = useTransition();
  const isDisabledAction = query.trim().length < 1;

  const { data, isFetching } = useQuery({
    queryKey: ["search-entity", `${searchType}-${executedQuery}`],
    queryFn: () =>
      swService.search(executedQuery, searchType as SEARCH_TYPE_PEOPLE),
    enabled: !!executedQuery,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    return () => {
      setExecutedQuery("");
      setQuery("");
    };
  }, []);

  return {
    searchType,
    setSearchType: useCallback(
      (value: string) => {
        setQuery("");
        setExecutedQuery("");
        setSearchType(value);
      },
      [setQuery, setSearchType]
    ),
    query,
    setQuery,
    isDisabled: isDisabledAction,
    onClickSearch: useCallback(() => {
      if (isPending) return;
      startTransition(async () => {
        setExecutedQuery(query);
      });
    }, [query, isPending]),
    isSearching: isFetching || isPending,
    results: data?.results || [],
  };
};
