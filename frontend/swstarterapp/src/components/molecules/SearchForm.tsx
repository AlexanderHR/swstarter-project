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
  const inputPlaceholder =
    searchType === "people"
      ? "e.g. Chewbacca, Yoda, Boba Fett"
      : "e.g. Yoda's Adventure, The Empire Strikes Back";
  return (
    <Card className="w-[410px] h-[230px] p-card-padding flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <RadioGroup
          legend={"What are you searching for?"}
          name={"searchType"}
          options={searchTypes}
          value={searchType}
          onChange={setSearchType}
        />
      </div>

      <div className="flex flex-col gap-5">
        <Input
          aria-label="Search Input"
          placeholder={inputPlaceholder}
          onChange={(e) => onChangeQuery(e.target.value)}
          value={query}
        />
        <Button
          variant={isDisabled ? "disabled" : "default"}
          onClick={onClickSearch}
        >
          {isSearching ? "SEARCHING..." : "SEARCH"}
        </Button>
      </div>
    </Card>
  );
};
