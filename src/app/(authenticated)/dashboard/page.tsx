import { getQueryClient } from "@/lib/get-query-client";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  // Get query client here
  const queryClient = getQueryClient();

  // TODO: Prefetch data here

  return <div> Dashboard - works </div>;
}
