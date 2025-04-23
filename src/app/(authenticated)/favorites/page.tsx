import { getQueryClient } from "@/lib/get-query-client";
import { getFavoriteNotes } from "@/server/notes";
import { StarIcon } from "lucide-react";
import { getAuthenticatedUser } from "@/server/user";
import { FavoriteNotesContent } from "@/components/favorite-notes-content";

export const metadata = {
  title: "Favorites",
};

export default async function FavoritesPage() {
  // Get authenticated user
  const user = await getAuthenticatedUser();

  // Get query client
  const queryClient = getQueryClient();

  // Prefetch recent notes
  await queryClient.prefetchQuery({
    queryKey: ["favorites"],
    queryFn: getFavoriteNotes,
  });

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Welcome section */}
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Yahoo {user?.name ? `, ${user.name.split(" ")[0]}` : ""}! 💜
        </h1>
        <p className="text-muted-foreground">
          Check out your favorites notes or edit them.
        </p>
      </section>

      {/* Recent notes section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <StarIcon className="text-primary h-5 w-5" />
          <h2 className="text-xl font-semibold">Favorite Notes</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FavoriteNotesContent />
        </div>
      </section>
    </div>
  );
}
