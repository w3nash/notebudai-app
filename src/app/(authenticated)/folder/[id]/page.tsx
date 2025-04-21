import { FolderPageComponent } from "@/components/folder-page";
import { getQueryClient } from "@/lib/get-query-client";
import { getFolder } from "@/server/folders";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const folder = await getFolder(id);
  return {
    title: folder ? `${folder.name} folder` : "Folder",
  };
}

export default async function FolderPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;
  const queryClient = getQueryClient();

  // Prefetch folder data
  await queryClient.prefetchQuery({
    queryKey: [id],
    queryFn: () => getFolder(id),
  });

  return <FolderPageComponent />;
}
