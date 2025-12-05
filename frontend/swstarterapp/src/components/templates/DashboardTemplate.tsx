import React from "react";
import { Header } from "../organisms/Header";
import { SearchForm } from "../molecules/SearchForm";
import { ResultsSection } from "../organisms/ResultsSection";

export const DashboardTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex justify-center gap-[30px] pt-[30px] px-4">
        <div className="flex gap-[30px] items-start">
          <SearchForm />
          <ResultsSection />
        </div>
      </main>
    </div>
  );
};
