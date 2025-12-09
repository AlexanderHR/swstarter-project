import { Layout } from "@/components/templates/Layout";
import React from "react";
import { MovieDetailsCard } from "./components/MovieDetailsCard";

type Props = {
  params: Promise<{ id: string }>;
};
export const MovieDetailsPage: React.FC<Props> = async ({ params }) => {
  const { id } = await params;

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-card-padding items-start">
        <MovieDetailsCard id={id} />
      </div>
    </Layout>
  );
};
