"use client";
import React from "react";
import { Card } from "../atoms/Card";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { RadioGroup } from "./RadioGroup";

export const SearchForm: React.FC = () => {
  const [searchType, setSearchType] = React.useState("people");

  return (
    <Card className="w-[410px] h-[230px] p-[30px] flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[20px]">
        <h2 className="text-sm font-semibold text-[#383838] font-montserrat">
          What are you searching for?
        </h2>
        <RadioGroup
          name="searchType"
          options={[
            { label: "People", value: "people" },
            { label: "Movies", value: "movies" },
          ]}
          value={searchType}
          onChange={setSearchType}
        />
      </div>

      <div className="flex flex-col gap-[20px]">
        <Input placeholder="e.g. Chewbacca, Yoda, Boba Fett" />
        <Button variant="disabled">SEARCH</Button>
      </div>
    </Card>
  );
};
