"use client";

import { useState } from "react";
import {
  Coffee,
  FileText,
  Folder,
  Linkedin,
  Mail,
  Briefcase as Suitcase,
  Sun,
  Terminal,
  Flower,
} from "lucide-react";
import { Dock, type DockItem } from "./Dock";
import { DesktopIcon } from "./DesktopIcon";
import { WindowManager } from "./WindowManager";
import { MenuBar } from "./MenuBar";
import { AboutMeApp } from "../apps/AboutMeApp";
import { CoffeeApp } from "../apps/CoffeeApp";
import { ContactApp } from "../apps/ContactApp";
import { ProjectsApp } from "../apps/ProjectsApp";
import { ExperienceApp } from "../apps/ExperienceApp";
import { TerminalApp } from "../apps/TerminalApp";
import { StoryApp } from "../apps/StoryApp";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const desktopApps = [
  {
    id: "projects",
    name: "Projects",
    icon: Folder,
    component: ProjectsApp,
  },
  {
    id: "about",
    name: "About Me",
    icon: Sun,
    component: AboutMeApp,
  },
  {
    id: "experience",
    name: "Experience",
    icon: Suitcase,
    component: ExperienceApp,
  },
  {
    id: "coffee",
    name: "Coffee",
    icon: Coffee,
    component: CoffeeApp,
  },
  {
    id: "story",
    name: "Story",
    icon: Flower,
    component: StoryApp,
  },
];

const windowApps = [
  ...desktopApps,
  {
    id: "contact",
    name: "Contact",
    icon: Mail,
    component: ContactApp,
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: Terminal,
    component: TerminalApp,
  },
];

const dockItems: DockItem[] = [
  {
    id: "resume",
    name: "Resume",
    icon: FileText,
    href: "https://drive.google.com/file/d/1lDQpEgUaqY_TewDf5vOuMLH8y4GWTNNI/view?usp=sharing",
    target: "_blank",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/lbhati/",
    target: "_blank",
  },
  {
    id: "contact",
    name: "Contact",
    icon: Mail,
    onClick: () => undefined,
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: Terminal,
    onClick: () => undefined,
  },
];

export function Desktop() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const handleOpenApp = (id: string) => {
    setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveWindow(id);
  };

  const handleCloseWindow = (id: string) => {
    setOpenWindows((prev) => {
      const next = prev.filter((windowId) => windowId !== id);
      setActiveWindow((current) =>
        current === id ? next[next.length - 1] ?? null : current
      );
      return next;
    });
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      <MenuBar />
      {/* Ambient Scene */}
      <div className="absolute inset-0 -z-10">
        <Scene />
      </div>

      {/* Desktop Icons */}
      <div className="absolute left-6 top-16 z-10 grid grid-cols-1 gap-4 pt-2">
        {desktopApps.map((app) => (
          <DesktopIcon
            key={app.id}
            id={app.id}
            name={app.name}
            icon={app.icon}
            onOpen={handleOpenApp}
          />
        ))}
      </div>

      {/* Window Manager */}
      <div className="pt-8">
        <WindowManager
          openWindows={openWindows}
          activeWindow={activeWindow}
          apps={windowApps}
          onActiveWindowChange={setActiveWindow}
          onCloseWindow={handleCloseWindow}
        />
      </div>

      {/* Dock */}
      <Dock
        items={dockItems.map((item) => {
          if (item.id === "contact") {
            return { ...item, onClick: () => handleOpenApp("contact") };
          }
          if (item.id === "terminal") {
            return { ...item, onClick: () => handleOpenApp("terminal") };
          }
          return item;
        })}
        activeIds={openWindows}
      />
    </div>
  );
}
