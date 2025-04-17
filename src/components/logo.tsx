import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  asLink?: boolean;
}

export function Logo({ className, asLink, ...props }: LogoProps) {
  if (asLink) {
    return (
      <Link href="/">
        <div className={cn("flex items-center gap-2", className)} {...props}>
          <Brain className="text-primary bg-accent h-10 w-10 rounded-full p-1" />
          <span className="text-xl font-bold">NoteBud</span>
        </div>
      </Link>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Brain className="text-primary bg-accent h-10 w-10 rounded-full p-1" />
      <span className="text-xl font-bold">NoteBud</span>
    </div>
  );
}
