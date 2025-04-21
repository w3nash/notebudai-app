"use client";

import { getFolder } from "@/server/folders";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export function FolderPageComponent() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    data: folder,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [id],
    queryFn: () => getFolder(id),
  });

  useEffect(() => {
    if (!isLoading && !folder) {
      router.push("/folder-not-found");
    }
  }, [isLoading, folder, router]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error :(</div>;

  return (
    <div>
      <h1>{folder?.name}</h1>
      <p>Folder ID: {folder?.id}</p>
    </div>
  );
}
