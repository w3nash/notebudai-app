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
import { getQueryClient } from "@/lib/get-query-client";
import { AddTagSidebarButton } from "./add-tag-button";
import { TagList } from "./tag-list";
import { toast } from "sonner";
import { createTag, getTags } from "@/server/tags";

export function TagsGroup() {
  const { state } = useSidebar();
  const queryClient = getQueryClient();

  const {
    data: items,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  const createMutation = useMutation({
    mutationFn: createTag,
    onSuccess: async (_data) => {
      await queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag created successfully.");
    },
    onError: (error) => {
      console.error("Error creating tag:", error);
      toast.error("Failed to create tag.");
    },
  });

  const handleCreateTag = () => {
    const tagName = prompt("Enter tag name:");
    if (tagName) {
      createMutation.mutate({ name: tagName });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error :(</div>;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Tags</SidebarGroupLabel>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarGroupAction onClick={handleCreateTag}>
            <Plus />
          </SidebarGroupAction>
        </TooltipTrigger>
        <TooltipContent side="right">Add tag</TooltipContent>
      </Tooltip>
      <SidebarGroupContent>
        <SidebarMenu>
          <AddTagSidebarButton
            length={items?.length}
            state={state}
            handleCreateTag={handleCreateTag}
          />
          <TagList items={items ?? []} state={state} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
