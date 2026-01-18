"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { GitCommit, Circle } from "lucide-react";

const experienceItems = [
  {
    date: "Current",
    title: "AI Automation Agency — Founder",
    message: "Building AI agents and modern product stacks for founders.",
  },
  {
    date: "Jan 2026",
    title: "Software Engineer — Job Search",
    message: "Applying to high-impact engineering roles across the Bay Area.",
  },
  {
    date: "Dec 2025",
    title: "B.S. Computer Science — SFSU",
    message: "Graduated with a focus on systems, AI, and product engineering.",
  },
  {
    date: "Jun 2025",
    title: "App Development Intern — LOOK",
    message: "Shipped mobile features and improved onboarding funnels.",
  },
  {
    date: "Spring 2025",
    title: "SF Volunteering + Tennis Leagues",
    message: "Community leadership and consistency outside of code.",
  },
];

const intensityClasses = [
  "bg-emerald-950/30",
  "bg-emerald-900/60",
  "bg-emerald-700/70",
  "bg-emerald-500/80",
  "bg-emerald-400",
];

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function ExperienceApp() {
  const heatmap = useMemo(() => {
    const rand = mulberry32(98423);
    return Array.from({ length: 52 * 7 }, () => Math.floor(rand() * 5));
  }, []);

  return (
    <div className="h-full w-full overflow-hidden p-6 text-gray-100">
      <div className="flex h-full flex-col gap-6 rounded-3xl border border-white/10 bg-[#0d1117]/90 p-6 shadow-2xl backdrop-blur-md">
        {/* Heatmap */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                Contribution Graph
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white">
                Consistent shipping across the year
              </h2>
            </div>
            <div className="text-xs text-white/50">2025</div>
          </div>

          <div className="mt-5 grid grid-cols-52 gap-1">
            {heatmap.map((level, index) => (
              <div
                key={`${index}-${level}`}
                className={`h-3 w-3 rounded-[3px] ${intensityClasses[level]}`}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-end gap-2 text-[11px] text-white/50">
            <span>Less</span>
            <div className="flex items-center gap-1">
              {intensityClasses.map((cls, index) => (
                <div key={index} className={`h-3 w-3 rounded-[3px] ${cls}`} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5">
          <motion.div
            className="absolute left-6 top-6 h-[calc(100%-3rem)] w-px bg-white/20"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          <div className="max-h-full overflow-y-auto pr-4 font-mono">
            {experienceItems.map((item, index) => (
              <motion.div
                key={item.title}
                className="relative flex gap-6 pb-8 pl-12"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="absolute left-3 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-[#0d1117]">
                  {index === 0 ? (
                    <GitCommit className="h-4 w-4 text-emerald-300" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 text-white/40" />
                  )}
                </div>
                <div className="group">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    {item.date}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/60 group-hover:text-emerald-200 transition-colors">
                    {item.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
