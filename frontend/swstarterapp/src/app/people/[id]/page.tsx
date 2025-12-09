import { PeopleDetailsPage } from "@/features/people/PeopleDetailsPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <PeopleDetailsPage params={params} />;
}
