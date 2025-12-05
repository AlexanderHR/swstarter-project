import React from "react";
import { Card } from "../atoms/Card";
import { Divider } from "../atoms/Divider";
import { EmptyState } from "../molecules/EmptyState";

export const ResultsSection: React.FC = () => {
  return (
    <Card className="w-card-size h-card-size flex flex-col">
      <div className="p-card-padding pb-0">
        <h2 className="text-lg font-bold text-black font-montserrat mb-gap-small">
          Results
        </h2>
        <Divider />
      </div>
      <div className="flex-1 flex items-center justify-center p-card-padding">
        <EmptyState />
      </div>
    </Card>
  );
};
