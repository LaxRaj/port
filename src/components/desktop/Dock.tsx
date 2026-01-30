"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
  const [bounceId, setBounceId] = useState<string | null>(null);
  const [centers, setCenters] = useState<number[]>([]);
  const dockRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const bounceTimeoutRef = useRef<number | null>(null);
  const hoveredName = hoveredIndex !== null ? items[hoveredIndex]?.name : null;

  useEffect(() => {
    const updateCenters = () => {
      const dockRect = dockRef.current?.getBoundingClientRect();
      if (!dockRect) return;
      const nextCenters = iconRefs.current.map((el) => {
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        return rect.left - dockRect.left + rect.width / 2;
      });
      setCenters(nextCenters);
    };

    updateCenters();
    window.addEventListener("resize", updateCenters);
    return () => window.removeEventListener("resize", updateCenters);
  }, [items.length]);

  const handleItemClick = (item: DockItem) => {
    if (bounceTimeoutRef.current) {
      window.clearTimeout(bounceTimeoutRef.current);
    }
    setBounceId(item.id);
    bounceTimeoutRef.current = window.setTimeout(() => {
      setBounceId(null);
    }, 350);

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
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div
        ref={dockRef}
        onMouseMove={(event) => {
          const rect = dockRef.current?.getBoundingClientRect();
          if (!rect) return;
          mouseX.set(event.clientX - rect.left);
          mouseY.set(event.clientY - rect.top);
        }}
        onMouseLeave={() => {
          mouseX.set(-9999);
          mouseY.set(-9999);
        }}
        className="relative flex items-end gap-3 px-5 py-3"
      >
        {items.map((item, index) => (
          <DockIcon
            key={item.id}
            item={item}
            index={index}
            isActive={activeIds.includes(item.id)}
            isHovered={hoveredIndex === index}
            isBouncing={bounceId === item.id}
            center={centers[index] ?? 0}
            mouseX={mouseX}
            setHoveredIndex={setHoveredIndex}
            setRef={(el) => {
              iconRefs.current[index] = el;
            }}
            onClick={() => handleItemClick(item)}
          />
        ))}
        {hoveredName && (
          <motion.div
            className="pointer-events-none absolute rounded-md bg-black/80 px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-white/90 shadow"
            style={{ left: mouseX, top: mouseY }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: -18 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            {hoveredName}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function DockIcon({
  item,
  index,
  isActive,
  isHovered,
  isBouncing,
  center,
  mouseX,
  setHoveredIndex,
  setRef,
  onClick,
}: {
  item: DockItem;
  index: number;
  isActive: boolean;
  isHovered: boolean;
  isBouncing: boolean;
  center: number;
  mouseX: ReturnType<typeof useMotionValue>;
  setHoveredIndex: (index: number | null) => void;
  setRef: (el: HTMLButtonElement | null) => void;
  onClick: () => void;
}) {
  const scale = useTransform(mouseX, [center - 160, center, center + 160], [1, 1.6, 1]);
  const iconScale = useTransform(mouseX, [center - 140, center, center + 140], [1, 1.25, 1]);

  return (
    <motion.button
      ref={setRef}
      onClick={onClick}
      onHoverStart={() => setHoveredIndex(index)}
      onHoverEnd={() => setHoveredIndex(null)}
      className="relative p-3 rounded-2xl transition-colors"
      animate={isBouncing ? { y: [0, -10, 0] } : { y: 0 }}
      transition={
        isBouncing
          ? { type: "keyframes", times: [0, 0.6, 1], duration: 0.35 }
          : { type: "spring", stiffness: 150, damping: 20 }
      }
      aria-label={item.name}
      style={{ scale }}
    >
      <motion.div style={{ scale: iconScale }}>
        <item.icon className="w-8 h-8 text-gray-800 dark:text-gray-200" />
      </motion.div>
      {isHovered && (
        <motion.div
          className="absolute -bottom-3 left-1/2 h-10 w-16 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.5),transparent_70%)] blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        />
      )}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        />
      )}
    </motion.button>
  );
}
