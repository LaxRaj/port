"use client";

import { motion, useMotionValue } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";
import { useWindowManager } from "@/hooks/useWindowManager";
import { WindowState } from "@/types/window";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface WindowProps {
  window: WindowState;
  onRequestClose: (id: string) => void;
}

export function Window({ window: windowState, onRequestClose }: WindowProps) {
  const {
    minimizeWindow,
    toggleMaximize,
    setActiveWindow,
    updateWindowPosition,
    bringToFront,
  } = useWindowManager();

  const MENU_BAR_HEIGHT = 32;
  const DOCK_HEIGHT = 96;

  const x = useMotionValue(windowState.isMaximized ? 0 : windowState.position.x);
  const y = useMotionValue(windowState.isMaximized ? MENU_BAR_HEIGHT : windowState.position.y);
  const windowRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({ width: windowState.size.width, height: windowState.size.height });

  useEffect(() => {
    if (windowState.isMaximized) {
      x.set(0);
      y.set(MENU_BAR_HEIGHT);
      if (typeof window !== "undefined") {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight - MENU_BAR_HEIGHT - DOCK_HEIGHT,
        });
      }
    } else {
      x.set(windowState.position.x);
      y.set(windowState.position.y);
      setWindowSize({ width: windowState.size.width, height: windowState.size.height });
    }
  }, [
    windowState.position.x,
    windowState.position.y,
    windowState.size.width,
    windowState.size.height,
    windowState.isMaximized,
    x,
    y,
    MENU_BAR_HEIGHT,
    DOCK_HEIGHT,
  ]);

  const handleDragStart = () => {
    if (!windowState.isMaximized) {
      bringToFront(windowState.id);
    }
  };

  const handleDragEnd = (_: any, info: any) => {
    if (!windowState.isMaximized && typeof window !== "undefined") {
      const newX = Math.max(0, Math.min(x.get(), window.innerWidth - windowSize.width));
      const newY = Math.max(0, Math.min(y.get(), window.innerHeight - windowSize.height));
      updateWindowPosition(windowState.id, {
        x: newX,
        y: newY,
      });
    }
  };

  if (windowState.isMinimized) {
    return null;
  }

  const dragConstraints = windowState.isMaximized
    ? false
    : typeof window !== "undefined"
    ? {
        left: 0,
        top: 0,
        right: window.innerWidth - windowSize.width,
        bottom: window.innerHeight - windowSize.height,
      }
    : { left: 0, top: 0, right: 0, bottom: 0 };

  return (
    <motion.div
      ref={windowRef}
      drag={!windowState.isMaximized}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={dragConstraints}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onPointerDown={() => setActiveWindow(windowState.id)}
      className={cn(
        "fixed top-0 left-0 rounded-2xl overflow-hidden",
        "bg-white/70 dark:bg-black/70 backdrop-blur-md",
        "border border-white/20 shadow-2xl",
        "flex flex-col",
        windowState.isActive ? "shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/20" : "shadow-xl",
        windowState.isMaximized ? "rounded-lg" : ""
      )}
      style={{
        x,
        y,
        zIndex: windowState.zIndex,
        cursor: "default",
        width: windowState.isMaximized ? "100vw" : `${windowSize.width}px`,
        height: windowState.isMaximized
          ? `calc(100vh - ${MENU_BAR_HEIGHT}px - ${DOCK_HEIGHT}px)`
          : `${windowSize.height}px`,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: windowState.isMaximized ? 0 : windowState.position.x,
        y: windowState.isMaximized ? MENU_BAR_HEIGHT : windowState.position.y,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Title Bar */}
      <div
        className="h-10 bg-white/30 dark:bg-black/30 backdrop-blur-sm flex items-center justify-between px-4 cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => {
          if (e.detail === 2) {
            toggleMaximize(windowState.id);
          }
        }}
      >
        <div className="flex items-center gap-2">
          {/* Traffic Light Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRequestClose(windowState.id);
              }}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
            >
              <X className="w-1.5 h-1.5 text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRequestClose(windowState.id);
              }}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
            >
              <Minus className="w-1.5 h-1.5 text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMaximize(windowState.id);
              }}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
            >
              <Maximize2 className="w-1.5 h-1.5 text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
          <span className="ml-4 text-sm font-medium text-gray-800 dark:text-gray-200">
            {windowState.title}
          </span>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-hidden">
        <windowState.component />
      </div>
    </motion.div>
  );
}
