"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        size="icon"
        variant="ghost"
        className="h-9 w-9"
        aria-label="Переключение темы"
        disabled
        suppressHydrationWarning
      >
        <Sun className="h-4 w-4 opacity-0" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="h-9 w-9"
          aria-label="Переключение темы"
          onClick={toggleTheme}
        >
          {isDark ? (
            <Sun className="h-4 w-4" />
          ) : (
            <MoonStar className="h-4 w-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{isDark ? "Переключить на светлую тему" : "Переключить на тёмную тему"}</p>
      </TooltipContent>
    </Tooltip>
  );
}

