import React from "react";

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <p className="text-sm font-bold text-pinkish-grey font-montserrat">
        There are zero matches.
        <br />
        Use the form to search for People or Movies.
      </p>
    </div>
  );
};
