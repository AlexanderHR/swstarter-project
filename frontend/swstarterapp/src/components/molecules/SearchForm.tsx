"use client";
import React from "react";
import { Card } from "../atoms/Card";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { RadioGroup } from "./RadioGroup";
import { searchTypes } from "../constants";

type Props = {
  searchType: string;
  setSearchType: (value: string) => void;
  onChangeQuery: (value: string) => void;
  query: string;
  onClickSearch: () => void;
  isSearching?: boolean;
  isDisabled?: boolean;
};
export const SearchForm: React.FC<Props> = ({
  searchType,
  setSearchType,
  onChangeQuery,
  query,
  onClickSearch,
  isSearching,
  isDisabled,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const inputPlaceholder =
    searchType === "people"
      ? "e.g. Chewbacca, Yoda, Boba Fett"
      : "e.g. Yoda's Adventure, The Empire Strikes Back";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDisabled && !isSearching) {
      onClickSearch();
    }
  };
  const radioGroupChange = (value: string) => {
    setSearchType(value);
    inputRef.current?.focus();
  };
  return (
    <Card className="min-w-96 box-border md:box-content md:w-auto w-full p-card-padding">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-full">
        <RadioGroup
          legend={"What are you searching for?"}
          name={"searchType"}
          options={searchTypes}
          value={searchType}
          onChange={radioGroupChange}
        />

        <Input
          ref={inputRef}
          aria-label="Search Input"
          placeholder={inputPlaceholder}
          onChange={(e) => onChangeQuery(e.target.value)}
          value={query}
        />
        <Button variant={isDisabled ? "disabled" : "default"} type="submit">
          {isSearching ? "SEARCHING..." : "SEARCH"}
        </Button>
      </form>
    </Card>
  );
};
