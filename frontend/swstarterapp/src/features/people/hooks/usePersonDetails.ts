"use client";

import { swService } from "@/services/swService";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};
export const usePersonDetails = (props: Props) => {
  const router = useRouter();
  const { data, isFetching } = useQuery({
    queryKey: ["people-details", `people-${props.id}`],
    queryFn: () => swService.getPerson(props.id),
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
