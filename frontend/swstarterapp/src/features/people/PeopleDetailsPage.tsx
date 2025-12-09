import { Layout } from "@/components/templates/Layout";
import React from "react";
import { PersonDetailsCard } from "./components/PersonDetailsCard";

type Props = {
  params: Promise<{ id: string }>;
};
export const PeopleDetailsPage: React.FC<Props> = async ({ params }) => {
  const { id } = await params;

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-card-padding items-start">
        <PersonDetailsCard id={id} />
      </div>
    </Layout>
  );
};
