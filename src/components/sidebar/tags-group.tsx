"use client";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { MoreHorizontal, Plus, Tag } from "lucide-react";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarGroupAction,
  SidebarMenuAction,
  SidebarMenuBadge,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

// Mock data for tags group
const items = [
  {
    title: "Important",
    counts: 5,
    url: "/tag/important",
  },
  {
    title: "Study",
    counts: 3,
    url: "/tag/school",
  },
  {
    title: "Project",
    counts: 8,
    url: "/tag/project",
  },
  {
    title: "Research",
    counts: 2,
    url: "/tag/research",
  },
];

export function TagsGroup() {
  const { state } = useSidebar();
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Tags</SidebarGroupLabel>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarGroupAction>
            <Plus />
          </SidebarGroupAction>
        </TooltipTrigger>
        <TooltipContent side="right">Add tag</TooltipContent>
      </Tooltip>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {state === "collapsed" ? (
                <Tooltip>
                  <TooltipTrigger>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.startsWith(item.url)}
                    >
                      <Link href={item.url}>
                        <Tag />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              ) : (
                <>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.url)}
                  >
                    <Link href={item.url}>
                      <Tag />
                      <span>{item.title}</span>
                      <SidebarMenuBadge className="bg-primary text-primary-foreground mr-6">
                        {item.counts}
                      </SidebarMenuBadge>
                    </Link>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction
                        className={
                          pathname.startsWith(item.url)
                            ? "text-primary-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            : ""
                        }
                      >
                        <MoreHorizontal />
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start">
                      <DropdownMenuItem>
                        <span>Edit {item.title}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Delete {item.title}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
