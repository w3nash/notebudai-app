"use client";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  useSidebar,
  SidebarGroupAction,
} from "../ui/sidebar";

import { useQuery, useMutation } from "@tanstack/react-query";
import { getFolders, createFolder } from "@/server/folders";
import { getQueryClient } from "@/lib/get-query-client";
import { AddFolderSidebarButton } from "./add-folder-button";
import { FolderList } from "./folder-list";
import { toast } from "sonner";

export function FoldersGroup() {
  const { state } = useSidebar();
  const queryClient = getQueryClient();

  const {
    data: items,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["folders"],
    queryFn: getFolders,
  });

  const createMutation = useMutation({
    mutationFn: createFolder,
    onSuccess: async (_data) => {
      await queryClient.invalidateQueries({ queryKey: ["folders"] });
      toast.success("Folder created successfully.");
    },
    onError: (error) => {
      console.error("Error creating folder:", error);
      toast.error("Failed to create folder.");
    },
  });

  const handleCreateFolder = () => {
    const folderName = prompt("Enter folder name:");
    if (folderName) {
      createMutation.mutate({ name: folderName });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error :(</div>;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Folders</SidebarGroupLabel>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarGroupAction onClick={handleCreateFolder}>
            <Plus />
          </SidebarGroupAction>
        </TooltipTrigger>
        <TooltipContent side="right">Add folder</TooltipContent>
      </Tooltip>
      <SidebarGroupContent>
        <SidebarMenu>
          <AddFolderSidebarButton
            length={items?.length}
            state={state}
            handleCreateFolder={handleCreateFolder}
          />
          <FolderList items={items ?? []} state={state} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
