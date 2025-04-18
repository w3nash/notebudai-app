import { SidebarTrigger } from "@/components/ui/sidebar";
import type React from "react";
import { ThemeToggle } from "../theme-toggle";

export function AppHeader() {
  return (
    <header className="bg-sidebar/40 sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b px-4 backdrop-blur-lg">
      <SidebarTrigger />
      <ThemeToggle />
    </header>
  );
}
