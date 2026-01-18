"use client";

import { Battery, Search, Terminal, Wifi } from "lucide-react";
import { useMemo } from "react";
import { useWindowManager } from "@/hooks/useWindowManager";
import { Clock } from "./Clock";

const appNameMap: Record<string, string> = {
  projects: "Finder",
  about: "About Me",
  experience: "Experience",
  coffee: "Coffee",
  contact: "Mail",
  terminal: "Terminal",
};

export function MenuBar() {
  const { activeWindowId } = useWindowManager();
  const activeLabel = useMemo(() => {
    if (!activeWindowId) return "Desktop";
    return appNameMap[activeWindowId] ?? "App";
  }, [activeWindowId]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-7 border-b border-white/10 bg-white/20 backdrop-blur-lg dark:bg-black/20">
      <div className="flex h-full items-center justify-between px-4 text-[13px] font-medium text-gray-800 dark:text-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-gray-700 dark:text-gray-200" />
            <span>{activeLabel}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
          <Search className="h-4 w-4" />
          <Wifi className="h-4 w-4" />
          <Battery className="h-4 w-4" />
          <Clock />
        </div>
      </div>
    </div>
  );
}
