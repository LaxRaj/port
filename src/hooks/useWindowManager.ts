"use client";

import { create } from "zustand";
import { WindowState, WindowPosition, WindowSize } from "@/types/window";
import { MAX_Z_INDEX, Z_INDEX_INCREMENT } from "@/lib/constants";

interface WindowStore {
  windows: WindowState[];
  activeWindowId: string | null;
  nextZIndex: number;
  
  openWindow: (window: Omit<WindowState, "zIndex" | "isActive">) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  setActiveWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: WindowPosition) => void;
  updateWindowSize: (id: string, size: WindowSize) => void;
  toggleMaximize: (id: string) => void;
  bringToFront: (id: string) => void;
}

export const useWindowManager = create<WindowStore>((set) => ({
  windows: [],
  activeWindowId: null,
  nextZIndex: 1,

  openWindow: (window) => {
    set((state) => {
      const newZIndex = state.nextZIndex + Z_INDEX_INCREMENT;
      const newWindow: WindowState = {
        ...window,
        zIndex: newZIndex,
        isActive: true,
      };

      return {
        windows: [...state.windows, newWindow],
        activeWindowId: window.id,
        nextZIndex: newZIndex,
      };
    });
  },

  closeWindow: (id) => {
    set((state) => {
      const updatedWindows = state.windows.filter((w) => w.id !== id);
      const newActiveId =
        id === state.activeWindowId
          ? updatedWindows.length > 0
            ? updatedWindows[updatedWindows.length - 1].id
            : null
          : state.activeWindowId;

      return {
        windows: updatedWindows,
        activeWindowId: newActiveId,
      };
    });
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true, isActive: false } : w
      ),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },

  restoreWindow: (id) => {
    set((state) => {
      const window = state.windows.find((w) => w.id === id);
      if (!window) return state;

      const newZIndex = state.nextZIndex + Z_INDEX_INCREMENT;
      return {
        windows: state.windows.map((w) =>
          w.id === id
            ? { ...w, isMinimized: false, isActive: true, zIndex: newZIndex }
            : w
        ),
        activeWindowId: id,
        nextZIndex: newZIndex,
      };
    });
  },

  setActiveWindow: (id) => {
    set((state) => {
      const window = state.windows.find((w) => w.id === id);
      if (!window || window.isActive || window.isMinimized) return state;

      const newZIndex = state.nextZIndex + Z_INDEX_INCREMENT;
      return {
        windows: state.windows.map((w) =>
          w.id === id
            ? { ...w, isActive: true, zIndex: newZIndex }
            : { ...w, isActive: false }
        ),
        activeWindowId: id,
        nextZIndex: newZIndex,
      };
    });
  },

  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    }));
  },

  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, size } : w)),
    }));
  },

  toggleMaximize: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }));
  },

  bringToFront: (id) => {
    set((state) => {
      const newZIndex = state.nextZIndex + Z_INDEX_INCREMENT;
      return {
        windows: state.windows.map((w) =>
          w.id === id ? { ...w, zIndex: newZIndex, isActive: true } : { ...w, isActive: false }
        ),
        activeWindowId: id,
        nextZIndex: newZIndex,
      };
    });
  },
}));
