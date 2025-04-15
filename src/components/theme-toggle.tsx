"use client";

import * as React from "react";
import { LaptopMinimal, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const THEME_OPTIONS = [
  { value: "dark", icon: Moon, label: "Toggle dark theme" },
  { value: "light", icon: Sun, label: "Toggle light theme" },
  { value: "system", icon: LaptopMinimal, label: "Toggle system theme" },
];

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid rendering on the server
  }

  const ThemeButton = ({
    value,
    Icon,
    label,
  }: {
    value: string;
    Icon: React.ComponentType<{ className: string }>;
    label: string;
  }) => (
    <Button
      variant={theme === value ? "default" : "ghost"}
      aria-label={label}
      disabled={theme === value}
      className="rounded-full disabled:opacity-100"
      onClick={() => setTheme(value)}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  return (
    <div className="bg-accent border-primary flex items-center rounded-full border">
      {THEME_OPTIONS.map(({ value, icon: Icon, label }) => (
        <TooltipProvider key={value}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ThemeButton value={value} Icon={Icon} label={label} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
