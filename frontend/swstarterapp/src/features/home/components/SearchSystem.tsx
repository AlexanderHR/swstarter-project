"use client";

import { SearchForm } from "@/components/molecules/SearchForm";
import { ResultsSection } from "@/components/organisms/ResultsSection";
import { useSearch } from "../hooks/useSearch";
import { SEARCH_TYPE_PEOPLE } from "@/types";

export const SearchSystem = () => {
  const {
    searchType,
    setSearchType,
    query,
    setQuery,
    isDisabled,
    onClickSearch,
    isSearching,
    results,
  } = useSearch();

  return (
    <>
      <SearchForm
        searchType={searchType}
        setSearchType={setSearchType}
        query={query}
        onChangeQuery={setQuery}
        onClickSearch={onClickSearch}
        isSearching={isSearching}
        isDisabled={isDisabled}
      />
      <ResultsSection
        type={searchType as SEARCH_TYPE_PEOPLE}
        isSearching={isSearching}
        results={results}
      />
    </>
  );
};
