"use client";

import type { Tag as TagType } from "@prisma/client";
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
import { Tag, MoreHorizontal } from "lucide-react";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { deleteTag, updateTag } from "@/server/tags";
import Link from "next/link";

export function TagList({ items, state }: { items: TagType[]; state: string }) {
  const pathname = usePathname();
  const queryClient = getQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTag,
    onSuccess: async (_data, tag) => {
      await queryClient.invalidateQueries({ queryKey: ["tags"] });
      await queryClient.invalidateQueries({ queryKey: [tag.id] });
    },
    onError: (error) => {
      console.error("Error deleting tag:", error);
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateTag(id, { name }),
    onSuccess: async (tag) => {
      await queryClient.invalidateQueries({ queryKey: ["tag"] });
      await queryClient.invalidateQueries({ queryKey: [tag.id] });
    },
    onError: (error) => {
      console.error("Error editing tag:", error);
    },
  });

  const handleDeleteTag = (id: string) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleEditTag = (id: string, currentName: string) => {
    const newName = window.prompt("Edit tag name:", currentName);
    if (newName?.trim() && newName !== currentName) {
      editMutation.mutate({ id, name: newName.trim() });
    }
  };

  return (
    <>
      {items?.map((item) => {
        const url = `/tag/${item.id}`;
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
                      <Tag />
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
                    <Tag />
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
                      onClick={() => handleEditTag(item.id, item.name)}
                    >
                      <span>Edit {item.name}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteTag(item.id)}>
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
