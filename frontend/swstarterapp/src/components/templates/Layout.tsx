import React, { PropsWithChildren } from "react";
import { Header } from "../organisms/Header";

type Props = PropsWithChildren;
export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex justify-center gap-[30px] pt-[30px] px-4">
        {children}
      </main>
    </div>
  );
};
