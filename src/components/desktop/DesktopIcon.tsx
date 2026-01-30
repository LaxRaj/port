"use client";

import { motion } from "framer-motion";

interface DesktopIconProps {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  onOpen: (id: string) => void;
}

export function DesktopIcon({ id, name, icon: Icon, onOpen }: DesktopIconProps) {
  return (
    <motion.button
      onClick={() => onOpen(id)}
      className="group flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
    >
      <div className="flex h-6 w-8 items-center justify-center">
        <Icon className="h-8 w-8 text-gray-200" />
      </div>
      <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
        {name}
      </span>
    </motion.button>
  );
}
