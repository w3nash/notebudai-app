"use client";

import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogIn, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

function SignOutButton() {
  return (
    <Button
      className="bg-red-500 text-white hover:bg-red-500/90"
      onClick={async () => {
        await signOut({ callbackUrl: "/login" });
      }}
    >
      Sign Out <LogOut />
    </Button>
  );
}

function DashboardButton() {
  return (
    <Link href="/dashboard">
      <Button variant="ghost">
        Dashboard <LayoutDashboard />
      </Button>
    </Link>
  );
}

function SignInButton() {
  return (
    <Link href="/login">
      <Button>
        Login <LogIn />
      </Button>
    </Link>
  );
}

export function LandingButtons({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return isAuthenticated ? (
    <div className="flex items-center gap-2">
      <DashboardButton />
      <SignOutButton />
    </div>
  ) : (
    <SignInButton />
  );
}
