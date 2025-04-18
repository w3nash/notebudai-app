import { auth } from "@/server/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  if (!isAuthenticated) {
    redirect("/login");
  }
  return (
    <>
      <p>Hi</p>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
}
