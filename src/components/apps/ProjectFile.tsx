import { motion } from "framer-motion";

interface ProjectFileProps {
  name: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

export function ProjectFile({ name, onClick, onDoubleClick }: ProjectFileProps) {
  return (
    <motion.button
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="group flex flex-col items-center gap-3 rounded-2xl px-3 py-4 text-center"
    >
      <div className="relative h-24 w-20 overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
        {/* Folded corner */}
        <div className="absolute right-0 top-0 h-6 w-6 bg-white/20">
          <div className="absolute right-0 top-0 h-6 w-6 origin-top-right rotate-45 bg-white/30" />
        </div>
        {/* Code lines */}
        <div className="absolute inset-3 space-y-2 blur-[0.4px]">
          <div className="h-1 w-10 rounded-full bg-white/30" />
          <div className="h-1 w-14 rounded-full bg-white/20" />
          <div className="h-1 w-8 rounded-full bg-white/25" />
          <div className="h-1 w-12 rounded-full bg-white/20" />
          <div className="h-1 w-6 rounded-full bg-white/30" />
        </div>
      </div>
      <span className="max-w-[140px] text-center text-xs font-medium text-white/80 break-words whitespace-normal">
        {name}
      </span>
    </motion.button>
  );
}
