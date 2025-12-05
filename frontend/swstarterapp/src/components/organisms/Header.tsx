import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="w-full h-[50px] bg-white shadow-[0_2px_0_0_#dadada] flex items-center justify-center">
      <h1 className="text-lg font-bold text-green-teal font-montserrat">
        SWStarter
      </h1>
    </header>
  );
};
