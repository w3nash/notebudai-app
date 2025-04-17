import { Brain } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background/80 w-full border-t py-6 backdrop-blur-lg">
      <div className="flex items-center justify-center gap-2">
        <Brain className="text-primary h-6 w-6" />
        <p className="font-medium">© 2025 NoteBud. All rights reserved.</p>
      </div>
    </footer>
  );
}
