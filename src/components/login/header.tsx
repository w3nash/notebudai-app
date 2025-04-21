import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function Header() {
  return (
    <header className="bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Logo asLink />
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="link">
              <ChevronLeft /> Back to Home
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
