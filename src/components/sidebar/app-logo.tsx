"use client";

import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  asLink?: boolean;
}

export function AppLogo({ className, asLink, ...props }: LogoProps) {
  const { state, isMobile } = useSidebar();
  if (asLink) {
    return (
      <Link href="/">
        <div
          className={cn("ml-1 flex items-center gap-2", className)}
          {...props}
        >
          <Brain className="text-primary" />
          <span
            className={cn(
              "text-xl font-bold",
              state == "collapsed" && "hidden justify-center",
            )}
          >
            NoteBud
          </span>
        </div>
      </Link>
    );
  }

  return (
    <div className={cn("ml-1 flex items-center gap-2", className)} {...props}>
      <Brain className="text-primary" />
      <span
        className={cn(
          "text-xl font-bold",
          state == "collapsed" && !isMobile ? "hidden justify-center" : "",
        )}
      >
        NoteBud
      </span>
    </div>
  );
}
