import { getQueryClient } from "@/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export const metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  // Get query client here
  const queryClient = getQueryClient();

  // TODO: Prefetch data here

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div> Settings - works </div>
    </HydrationBoundary>
  );
}
