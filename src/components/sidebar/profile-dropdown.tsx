"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";

export function ProfileDropdown() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    );
  }

  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:cursor-pointer">
        <Avatar>
          <AvatarImage src={user?.image ?? undefined} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card/40 backdrop-blur-lg">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col items-center px-4 py-2">
          <Avatar>
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="my-1 text-sm font-bold">{user?.name}</span>
          <span className="text-xs">{user?.email}</span>
        </div>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem> */}
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={async () => await signOut()}
        >
          <LogOut />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
