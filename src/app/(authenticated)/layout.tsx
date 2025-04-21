import { auth } from "@/server/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { AppHeader } from "@/components/sidebar/app-header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { getFolders } from "@/server/folders";
import { getTags } from "@/server/tags";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  if (!isAuthenticated) {
    redirect("/login");
  }

  // Get query client here
  const queryClient = getQueryClient();

  // Prefetch folders here
  await queryClient.prefetchQuery({
    queryKey: ["folders"],
    queryFn: getFolders,
  });

  // Prefetch tags here
  await queryClient.prefetchQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
    </HydrationBoundary>
  );
}
