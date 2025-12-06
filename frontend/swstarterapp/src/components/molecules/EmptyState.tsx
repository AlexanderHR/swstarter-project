import React from "react";
import { Paragraph } from "../atoms/Paragraph";

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Paragraph>
        There are zero matches.
        <br />
        Use the form to search for People or Movies.
      </Paragraph>
    </div>
  );
};
