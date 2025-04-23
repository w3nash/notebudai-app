import { getQueryClient } from "@/lib/get-query-client";
import { getRecentNotes } from "@/server/notes";
import { CalendarClock } from "lucide-react";
import { RecentNotesContent } from "@/components/recent-notes-content";
import { getAuthenticatedUser } from "@/server/user";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  // Get authenticated user
  const user = await getAuthenticatedUser();

  // Get query client
  const queryClient = getQueryClient();

  // Prefetch recent notes
  await queryClient.prefetchQuery({
    queryKey: ["recentNotes"],
    queryFn: getRecentNotes,
  });

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Welcome section */}
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome{user?.name ? `, ${user.name.split(" ")[0]}` : ""}! 👋
        </h1>
        <p className="text-muted-foreground">
          Review your recent notes or create a new one to get started.
        </p>
      </section>

      {/* Recent notes section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <CalendarClock className="text-primary h-5 w-5" />
          <h2 className="text-xl font-semibold">Recent Notes</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <RecentNotesContent />
        </div>
      </section>
    </div>
  );
}
