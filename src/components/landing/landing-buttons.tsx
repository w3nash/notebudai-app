"use client";

import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

function SignOutButton() {
  return (
    <Button
      className="bg-red-500 text-white hover:bg-red-500/90"
      onClick={async () => {
        await signOut({ callbackUrl: "/" });
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

export function SignInWithGoogleButton() {
  return (
    <Button onClick={() => signIn("google")}>
      Continue with
      <span className="flex items-center justify-center rounded-full bg-white p-1">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google"
          width={16}
          height={16}
        />
      </span>
    </Button>
  );
}

export function LandingButtons() {
  return (
    <div className="flex items-center gap-2">
      <DashboardButton />
      <SignOutButton />
    </div>
  );
}
