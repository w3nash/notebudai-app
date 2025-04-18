import { auth } from "@/server/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { AppHeader } from "@/components/sidebar/app-header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <SessionProvider>
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar />
          <div className="flex w-full flex-1 flex-col">
            <AppHeader />
            <main className="p-4">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
