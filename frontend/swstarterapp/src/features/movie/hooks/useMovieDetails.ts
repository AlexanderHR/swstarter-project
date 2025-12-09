"use client";

import { swService } from "@/services/swService";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};
export const useMovieDetails = (props: Props) => {
  const router = useRouter();
  const { data, isFetching } = useQuery({
    queryKey: ["movie-details", `movie-${props.id}`],
    queryFn: () => swService.getMovie(props.id),
  });

  const handleBack = () => {
    router.push("/");
  };

  return {
    data,
    isFetching,
    handleBack,
  };
};
