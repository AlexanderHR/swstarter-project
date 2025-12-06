"use client";

import { SearchForm } from "@/components/molecules/SearchForm";
import { ResultsSection } from "@/components/organisms/ResultsSection";
import { useSearch } from "../hooks/useSearch";

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
      <ResultsSection isSearching={isSearching} results={results} />
    </>
  );
};
