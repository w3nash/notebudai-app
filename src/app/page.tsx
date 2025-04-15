import { ThemeToggle } from "@/components/theme-toggle";
import { Brain } from "lucide-react";
import Link from "next/link";
import {
  LandingButtons,
  SignInWithGoogleButton,
} from "@/components/landing/landing-buttons";
import { auth } from "@/server/auth";

export default async function HomePage() {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <main className="flex min-h-screen flex-col">
      <header className="bg-background sticky top-0 z-40 w-full border-b backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Brain className="text-primary h-6 w-6" />
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
            {isAuthenticated ? <LandingButtons /> : <SignInWithGoogleButton />}
          </div>
        </div>
      </header>
    </main>
  );
}
