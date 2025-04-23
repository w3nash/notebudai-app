"use client";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Tags } from "lucide-react";
import { SidebarMenuButton } from "../ui/sidebar";

export function AddTagSidebarButton({
  length,
  state,
  handleCreateTag,
}: {
  length: number | undefined;
  state: string;
  handleCreateTag: () => void;
}) {
  const renderButton = () => (
    <SidebarMenuButton onClick={handleCreateTag}>
      <Tags />
      <span>Add Tag</span>
    </SidebarMenuButton>
  );

  const renderTooltipButton = () => (
    <Tooltip>
      <TooltipTrigger asChild>{renderButton()}</TooltipTrigger>
      <TooltipContent side="right">Add Tag</TooltipContent>
    </Tooltip>
  );

  if (length === 0) {
    return state === "collapsed" ? renderTooltipButton() : renderButton();
  } else {
    return state === "collapsed" ? renderTooltipButton() : null;
  }
}
