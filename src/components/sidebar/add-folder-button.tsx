"use client";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { FolderPlus } from "lucide-react";
import { SidebarMenuButton } from "../ui/sidebar";

export function AddFolderSidebarButton({
  length,
  state,
  handleCreateFolder,
}: {
  length: number | undefined;
  state: string;
  handleCreateFolder: () => void;
}) {
  const renderButton = () => (
    <SidebarMenuButton onClick={handleCreateFolder}>
      <FolderPlus />
      <span>Add Folder</span>
    </SidebarMenuButton>
  );

  const renderTooltipButton = () => (
    <Tooltip>
      <TooltipTrigger asChild>{renderButton()}</TooltipTrigger>
      <TooltipContent side="right">Add Folder</TooltipContent>
    </Tooltip>
  );

  if (length === 0) {
    return state === "collapsed" ? renderTooltipButton() : renderButton();
  } else {
    return state === "collapsed" ? renderTooltipButton() : null;
  }
}
