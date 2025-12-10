"use client";
import React from "react";
import { Card } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Person } from "@/types";
import { usePersonDetails } from "../hooks/usePersonDetails";
import Link from "next/link";
import { Divider } from "@/components/atoms/Divider";
import { Skeleton } from "@/components/atoms/Skeleton";

interface Props {
  id: string;
}

export const PersonDetailsCard: React.FC<Props> = ({ id }) => {
  const { handleBack, data, isFetching } = usePersonDetails({ id });
  const person = data || ({} as Person);

  return (
    <Card className="md:w-3xl w-full min-h-96 p-card-padding relative flex flex-col">
      {isFetching ? (
        <Skeleton className="h-7 w-48 mb-8" />
      ) : (
        <h1 className="font-montserrat font-bold text-lg text-black mb-8">
          {person.name}
        </h1>
      )}

      <div className="flex flex-col md:flex-row gap-20">
        {/* Details Column */}
        <div className="flex-1">
          <h2 className="font-montserrat font-bold text-base text-black mb-2">
            Details
          </h2>
          <Divider className="mb-4" />

          <div className="space-y-1">
            {isFetching && (
              <>
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
              </>
            )}
            {!isFetching && (
              <>
                <p className="text-sm text-black">
                  Birth Year: {person.birth_year}
                </p>
                <p className="text-sm text-black">Gender: {person.gender}</p>
                <p className="text-sm text-black">
                  Eye Color: {person.eye_color}
                </p>
                <p className="text-sm text-black">
                  Hair Color: {person.hair_color}
                </p>
                <p className="text-sm text-black">Height: {person.height}</p>
                <p className="text-sm text-black">Mass: {person.mass}</p>
              </>
            )}
          </div>
        </div>

        {/* Movies Column */}
        <div className="flex-1">
          <h2 className="font-montserrat font-bold text-base text-black mb-2">
            Movies
          </h2>
          <Divider className="mb-4" />
          {isFetching && <Skeleton className="h-5 w-48" />}

          {!isFetching && (
            <p className="space-y-1">
              {person.films?.map((film, index) => (
                <span key={film.id}>
                  {index > 0 && ",\u00A0"}
                  <Link
                    href={`/movie/${film.id}`}
                    className="font-montserrat text-sm text-[#0094ff]"
                  >
                    {film.title}
                  </Link>
                </span>
              ))}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-left">
        <div className="w-[187px]">
          <Button onClick={handleBack} className="rounded-[17px]">
            BACK TO SEARCH
          </Button>
        </div>
      </div>
    </Card>
  );
};
