import React from "react";
import { Card } from "../atoms/Card";
import { Divider } from "../atoms/Divider";
import { EmptyState } from "../molecules/EmptyState";
import { Person } from "@/types/people";
import { Paragraph } from "../atoms/Paragraph";
import { StatusMessage } from "../atoms/StatusMessage";

type Props = {
  isSearching?: boolean;
  results?: Person[];
};

export const ResultsSection: React.FC<Props> = ({
  isSearching,
  results = [],
}) => {
  return (
    <Card className="w-card-size h-card-size flex flex-col">
      <div className="p-card-padding pb-0">
        <h2 className="text-lg font-bold text-black font-montserrat mb-gap-small">
          Results
        </h2>
        <Divider />
      </div>
      <div className="flex-1 overflow-y-auto p-card-padding">
        {isSearching ? (
          <StatusMessage>
            <Paragraph>Searching...</Paragraph>
          </StatusMessage>
        ) : results.length > 0 ? (
          <ul className="space-y-2">
            {results.map((person) => (
              <li
                key={person.uid}
                className="p-2 border-b border-gray-100 last:border-0"
              >
                <Paragraph className="font-bold">{person.name}</Paragraph>
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
