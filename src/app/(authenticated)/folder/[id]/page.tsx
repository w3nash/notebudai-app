import { getQueryClient } from "@/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `${id} folder`,
  };
}

export default async function FolderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Get query client here
  const queryClient = getQueryClient();

  // TODO: Prefetch data here

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div> {id} - works </div>
    </HydrationBoundary>
  );
}
