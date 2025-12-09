import { MovieDetailsPage } from "@/features/movie/MovieDetailsPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <MovieDetailsPage params={params} />;
}
