import { FolderNotesContent } from "@/components/folder-notes-content";
import { getQueryClient } from "@/lib/get-query-client";
import { getFolder } from "@/server/folders";
import { getAuthenticatedUser } from "@/server/user";
import { Folder } from "lucide-react";

export async function generateMetadata() {
  return {
    title: "Folder",
  };
}

export default async function FolderPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;
  // Get authenticated user
  const user = await getAuthenticatedUser();

  // Get query client
  const queryClient = getQueryClient();

  // Prefetch recent notes
  const folder = await queryClient.fetchQuery({
    queryKey: [id],
    queryFn: ({ queryKey }) => getFolder(queryKey[0]!),
  });

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Welcome section */}
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Organized{user?.name ? `, ${user.name.split(" ")[0]}` : ""}? 😂
        </h1>
        <p className="text-muted-foreground">
          Check out the content of your folder.
        </p>
      </section>

      {/* Recent notes section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Folder className="text-primary h-5 w-5" />
          <h2 className="text-xl font-semibold">Folder {folder?.name}</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FolderNotesContent />
        </div>
      </section>
    </div>
  );
}
