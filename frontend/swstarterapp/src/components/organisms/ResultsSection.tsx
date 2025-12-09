import React from "react";
import { Card } from "../atoms/Card";
import { Divider } from "../atoms/Divider";
import { EmptyState } from "../molecules/EmptyState";
import { SearchResponse } from "@/types";
import { Paragraph } from "../atoms/Paragraph";
import { StatusMessage } from "../atoms/StatusMessage";
import { Button } from "../atoms/Button";
import Link from "next/link";
import { SEARCH_TYPE_PEOPLE } from "@/types";

type Props = {
  isSearching?: boolean;
  results?: SearchResponse["results"];
  type: SEARCH_TYPE_PEOPLE;
};

export const ResultsSection: React.FC<Props> = ({
  isSearching,
  results = [],
  type,
}) => {
  return (
    <Card className="w-card-size h-card-size flex flex-col">
      <div className="p-card-padding pb-0">
        <h2 className="text-lg font-bold font-montserrat mb-gap-small">
          Results
        </h2>
        <Divider />
      </div>
      <div className="flex-1 overflow-y-auto px-card-padding">
        {isSearching ? (
          <StatusMessage>
            <Paragraph>Searching...</Paragraph>
          </StatusMessage>
        ) : results.length > 0 ? (
          <ul className="">
            {results.map((item) => (
              <li
                key={item.uid}
                className="flex items-center justify-between py-4 border-b border-gray-200 last:border-0"
              >
                <Paragraph className="font-bold text-base text-black">
                  {item.description}
                </Paragraph>
                <div className="w-[134px]">
                  <Link
                    href={`/${type === "films" ? "movie" : type}/${item.uid}`}
                  >
                    <Button className="h-button-height rounded-[17px] text-sm">
                      SEE DETAILS
                    </Button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <StatusMessage>
            <EmptyState />
          </StatusMessage>
        )}
      </div>
    </Card>
  );
};
