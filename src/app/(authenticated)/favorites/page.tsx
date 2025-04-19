import { getQueryClient } from "@/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export const metadata = {
  title: "Favorites",
};

export default async function FavoritesPage() {
  // Get query client here
  const queryClient = getQueryClient();

  // TODO: Prefetch data here

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div> Favorites - works </div>
    </HydrationBoundary>
  );
}
