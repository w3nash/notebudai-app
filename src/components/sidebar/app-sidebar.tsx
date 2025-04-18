import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { AppLogo } from "@/components/sidebar/app-logo";
import { MenuGroup } from "./menu-group";
import { FoldersGroup } from "./folders-group";
import { TagsGroup } from "./tags-group";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <AppLogo asLink />
      </SidebarHeader>
      <SidebarContent>
        <MenuGroup />
        <FoldersGroup />
        <TagsGroup />
      </SidebarContent>
    </Sidebar>
  );
}
