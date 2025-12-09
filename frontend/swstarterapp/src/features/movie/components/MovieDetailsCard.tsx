"use client";
import React from "react";
import { Card } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";
import { Divider } from "@/components/atoms/Divider";
import { Skeleton } from "@/components/atoms/Skeleton";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { Movie } from "@/types";

interface Props {
  id: string;
}

export const MovieDetailsCard: React.FC<Props> = ({ id }) => {
  const { handleBack, data, isFetching } = useMovieDetails({ id });
  const movie = data || ({} as Movie);

  return (
    <Card className="md:w-3xl w-full min-h-96 p-card-padding relative flex flex-col">
      {isFetching ? (
        <Skeleton className="h-7 w-48 mb-8" />
      ) : (
        <h1 className="font-montserrat font-bold text-lg text-black mb-8">
          {movie.title}
        </h1>
      )}

      <div className="flex flex-col md:flex-row gap-20">
        <div className="flex-1">
          <h2 className="font-montserrat font-bold text-base text-black mb-2">
            Opening Crawl
          </h2>
          <Divider className="mb-4" />

          <div className="space-y-1">
            {isFetching && (
              <>
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-24" />
              </>
            )}
            {!isFetching && (
              <>
                <div className="text-sm text-black whitespace-pre-wrap">
                  {movie.opening_crawl}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Movies Column */}
        <div className="flex-1">
          <h2 className="font-montserrat font-bold text-base text-black mb-2">
            Characters
          </h2>
          <Divider className="mb-4" />
          {isFetching && <Skeleton className="h-5 w-48" />}

          {!isFetching && (
            <p className="space-y-1">
              {movie.characters?.map((character, index) => (
                <span key={character.id}>
                  {index > 0 && ",\u00A0"}
                  <Link
                    href={`/people/${character.id}`}
                    className="font-montserrat text-sm text-[#0094ff]"
                  >
                    {character.name}
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
