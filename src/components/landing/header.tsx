import { Brain } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import { LandingButtons } from "./landing-buttons";
import Link from "next/link";

export function Header({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <header className="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Brain className="text-primary bg-accent h-10 w-10 rounded-full p-1" />
          <span className="text-xl font-bold">NoteBud</span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#features"
            className="hover:text-primary underline-offset-4 hover:underline"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="hover:text-primary underline-offset-4 hover:underline"
          >
            How It Works
          </Link>
          <Link
            href="#study-smarter"
            className="hover:text-primary underline-offset-4 hover:underline"
          >
            Study Smarter
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
