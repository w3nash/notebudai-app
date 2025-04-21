import { ThemeToggle } from "../theme-toggle";
import { LandingButtons } from "./landing-buttons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function Header({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <header className="bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Logo asLink />
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="#features">
            <Button variant="link">Features</Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="link">How It Works</Button>
          </Link>
          <Link href="#study-smarter">
            <Button variant="link">Study Smarter</Button>
          </Link>
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-4">
          <LandingButtons isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </header>
  );
}
