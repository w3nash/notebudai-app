import { getQueryClient } from "@/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `Edit ${id} note`,
  };
}

export default async function EditNotePage({
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
      <div> Edit {id} - works </div>
    </HydrationBoundary>
  );
}
