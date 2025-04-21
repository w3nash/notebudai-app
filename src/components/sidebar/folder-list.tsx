"use client";

import type { Folder as FolderType } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Folder, MoreHorizontal } from "lucide-react";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { deleteFolder, updateFolder } from "@/server/folders";
import Link from "next/link";

export function FolderList({
  items,
  state,
}: {
  items: FolderType[];
  state: string;
}) {
  const pathname = usePathname();
  const queryClient = getQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteFolder,
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["folders"] });
      await queryClient.invalidateQueries({ queryKey: [variables.id] });
    },
    onError: (error) => {
      console.error("Error deleting folder:", error);
    },
  });

  const editMutation = useMutation({
    // updateFolder now takes (id, data)
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateFolder(id, { name }),
    onSuccess: async (folder) => {
      await queryClient.invalidateQueries({ queryKey: ["folders"] });
      await queryClient.invalidateQueries({ queryKey: [folder.id] });
    },
    onError: (error) => {
      console.error("Error editing folder:", error);
    },
  });

  const handleDeleteFolder = (id: string) => {
    if (window.confirm("Are you sure you want to delete this folder?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleEditFolder = (id: string, currentName: string) => {
    const newName = window.prompt("Edit folder name:", currentName);
    if (newName?.trim() && newName !== currentName) {
      editMutation.mutate({ id, name: newName.trim() });
    }
  };

  return (
    <>
      {items?.map((item) => {
        const url = `/folder/${item.id}`;
        return (
          <SidebarMenuItem key={item.id}>
            {state === "collapsed" ? (
              <Tooltip>
                <TooltipTrigger>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(url)}
                  >
                    <Link href={url}>
                      <Folder />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right">{item.name}</TooltipContent>
              </Tooltip>
            ) : (
              <>
                <SidebarMenuButton asChild isActive={pathname.startsWith(url)}>
                  <Link href={url}>
                    <Folder />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction
                      className={
                        pathname.startsWith(url)
                          ? "text-primary-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          : ""
                      }
                    >
                      <MoreHorizontal />
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start">
                    <DropdownMenuItem
                      onClick={() => handleEditFolder(item.id, item.name)}
                    >
                      <span>Edit {item.name}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteFolder(item.id)}
                    >
                      Delete {item.name}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </SidebarMenuItem>
        );
      })}
    </>
  );
}
