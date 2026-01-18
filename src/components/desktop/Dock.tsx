"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export interface DockItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  href?: string;
  target?: "_blank" | "_self";
}

interface DockProps {
  items: DockItem[];
  activeIds?: string[];
}

export function Dock({ items, activeIds = [] }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleItemClick = (item: DockItem) => {
    if (item.onClick) {
      item.onClick();
      return;
    }

    if (item.href && typeof window !== "undefined") {
      window.open(item.href, item.target ?? "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-end gap-2 px-4 py-3 bg-white/30 dark:bg-black/30 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
        {items.map((item, index) => {
          const isHovered = hoveredIndex === index;
          const isActive = activeIds.includes(item.id);
          const scale = isHovered ? 1.5 : 1;

          return (
            <motion.button
              key={item.id}
              onClick={() => handleItemClick(item)}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative p-3 rounded-2xl transition-colors hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              aria-label={item.name}
            >
              <motion.div
                animate={{ scale }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <item.icon className="w-8 h-8 text-gray-800 dark:text-gray-200" />
              </motion.div>
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                />
              )}
              {isHovered && (
                <motion.div
                  className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-[10px] font-medium text-white shadow"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  {item.name}
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
