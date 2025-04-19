import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  // Get query client here
  const queryClient = getQueryClient();

  // TODO: Prefetch data here

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div> Dashboard - works </div>
    </HydrationBoundary>
  );
}
