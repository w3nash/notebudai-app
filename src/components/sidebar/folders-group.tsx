"use client";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Folder, MoreHorizontal, Plus } from "lucide-react";
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

// Mock data for folders group
const items = [
  {
    title: "School",
    counts: 5,
    url: "/folder/school",
  },
  {
    title: "Work",
    counts: 3,
    url: "/folder/work",
  },
  {
    title: "Personal",
    counts: 8,
    url: "/folder/personal",
  },
];

export function FoldersGroup() {
  const { state } = useSidebar();
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Folders</SidebarGroupLabel>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarGroupAction>
            <Plus />
          </SidebarGroupAction>
        </TooltipTrigger>
        <TooltipContent side="right">Add folder</TooltipContent>
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
                        <Folder />
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
                      <Folder />
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
