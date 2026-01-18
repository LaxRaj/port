"use client";

import { useEffect, useMemo } from "react";
import { useWindowManager } from "@/hooks/useWindowManager";
import { DEFAULT_WINDOW_POSITION, DEFAULT_WINDOW_SIZE } from "@/lib/constants";
import { Window } from "./Window";

interface DesktopApp {
  id: string;
  name: string;
  component: React.ComponentType<Record<string, never>>;
}

interface WindowManagerProps {
  openWindows: string[];
  activeWindow: string | null;
  apps: DesktopApp[];
  onActiveWindowChange?: (id: string | null) => void;
  onCloseWindow: (id: string) => void;
}

export function WindowManager({
  openWindows,
  activeWindow,
  apps,
  onActiveWindowChange,
  onCloseWindow,
}: WindowManagerProps) {
  const {
    windows,
    openWindow,
    closeWindow,
    setActiveWindow,
    activeWindowId,
  } = useWindowManager();

  const appMap = useMemo(() => {
    return new Map(apps.map((app) => [app.id, app]));
  }, [apps]);

  useEffect(() => {
    openWindows.forEach((id) => {
      const exists = windows.some((w) => w.id === id);
      if (!exists) {
        const app = appMap.get(id);
        if (app) {
          openWindow({
            id: app.id,
            title: app.name,
            component: app.component,
            position: DEFAULT_WINDOW_POSITION,
            size: DEFAULT_WINDOW_SIZE,
            isMinimized: false,
            isMaximized: false,
          });
        }
      }
    });

    windows.forEach((w) => {
      if (!openWindows.includes(w.id)) {
        closeWindow(w.id);
      }
    });
  }, [openWindows, windows, appMap, openWindow, closeWindow]);

  useEffect(() => {
    if (!activeWindow || activeWindowId === activeWindow) return;
    const target = windows.find((w) => w.id === activeWindow);
    if (target && !target.isMinimized) {
      setActiveWindow(activeWindow);
    }
  }, [activeWindow, activeWindowId, windows, setActiveWindow]);

  useEffect(() => {
    if (onActiveWindowChange && activeWindowId !== activeWindow) {
      onActiveWindowChange(activeWindowId);
    }
  }, [activeWindowId, activeWindow, onActiveWindowChange]);

  return (
    <>
      {windows.map((window) => (
        <Window
          key={window.id}
          window={window}
          onRequestClose={onCloseWindow}
        />
      ))}
    </>
  );
}
