import { Layout } from "@/components/templates/Layout";
import React from "react";
import { SearchSystem } from "./components/SearchSystem";

export const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-card-padding items-start">
        <SearchSystem />
      </div>
    </Layout>
  );
};
