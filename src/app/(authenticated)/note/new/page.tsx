import { getQueryClient } from "@/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export async function generateMetadata() {
  return {
    title: `New Note`,
  };
}

export default async function NewNotePage() {
  // Get query client here
  const queryClient = getQueryClient();

  // TODO: Prefetch data here

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div> New Note - works </div>
    </HydrationBoundary>
  );
}
