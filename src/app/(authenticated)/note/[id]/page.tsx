import { getQueryClient } from "@/lib/get-query-client";
import { Tiptap } from "@/components/tiptap-editor";
import { getNote } from "@/server/notes";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return {
    title: `Edit Note`,
  };
}

export default async function NotePage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Get query client here
  const queryClient = getQueryClient();

  // Prefetch the note data
  let note;
  try {
    note = await queryClient.fetchQuery({
      queryKey: ["note", id],
      queryFn: () => getNote(id),
    });
  } catch (error) {
    console.error("Error prefetching note:", error);
  }

  if (!note) {
    return redirect("/note-not-found");
  }

  return <Tiptap note={note} isEditMode />;
}
