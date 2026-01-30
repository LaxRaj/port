"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Milestone = {
  id: string;
  date: string;
  title: string;
  description: string;
};

const milestones: Milestone[] = [
  {
    id: "sfsu",
    date: "Dec 2025",
    title: "B.S. in Computer Science — San Francisco State University",
    description: "Focused on systems, AI, and product engineering fundamentals.",
  },
  {
    id: "customs",
    date: "Project",
    title: "Customs Compliance AI Agent",
    description: "LLM-driven automation to streamline compliance workflows.",
  },
  {
    id: "email-suite",
    date: "Project",
    title: "Email Intelligence Suite",
    description: "OpenAI-powered NLP tooling for smart inbox triage.",
  },
  {
    id: "community",
    date: "Community",
    title: "Think Round, Inc. + The Drawing Room SF",
    description: "Arts + tech volunteering with a human-centered focus.",
  },
];

export function ExperienceApp() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="h-full w-full p-6 text-white">
      <div className="h-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-6">
        <div className="grid h-full grid-cols-[36px_1fr] gap-6">
          {/* Gutter */}
          <div className="relative">
            <motion.div
              className="absolute left-1/2 top-2 h-[calc(100%-1rem)] w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
            />
            <div className="absolute left-1/2 top-2 flex h-full -translate-x-1/2 flex-col gap-10">
              {milestones.map((item) => (
                <div key={item.id} className="relative">
                  <div
                    className={`h-3 w-3 rounded-full border border-white/20 bg-white/20 transition ${
                      hoveredId === item.id
                        ? "shadow-[0_0_12px_rgba(168,139,250,0.8)]"
                        : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="max-h-full overflow-y-auto pr-4 font-mono">
            {milestones.map((item, index) => (
              <motion.div
                key={item.id}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-[11px] uppercase tracking-widest text-white/50">
                  {item.date}
                </p>
                <h3 className="mt-2 text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
