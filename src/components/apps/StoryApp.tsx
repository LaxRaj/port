"use client";

import { motion } from "framer-motion";

const paragraphs = [
  {
    title: "The SF Chapter",
    text: "Life in San Francisco has been a rhythm of foggy courts at San Francisco State University and late-night builds at Founders, Inc. It's where city lights meet disciplined craft, and every block feels like a new prototype waiting to ship.",
  },
  {
    title: "The Competitive Drive",
    text: "The GLTF 7.5 Combo and Pac Cup leagues taught me that consistency beats intensity. That discipline shows up in my code: clean, performant, and tuned for reliability under pressure.",
  },
  {
    title: "The Vision",
    text: "Founding an AI Automation Agency shaped my belief that software should feel as natural as breathing. The next chapter is building fintech tools that remove friction, amplify trust, and scale with elegance.",
  },
  {
    title: "The Intellectual Core",
    text: "The Psychology of Money and Crime and Punishment sharpen my approach to software architecture: human-centered, accountable, and built for the long game.",
  },
];

export function StoryApp() {
  return (
    <motion.div
      className="relative h-full w-full overflow-hidden rounded-3xl border border-white/20 bg-orange-50/30 text-gray-800 shadow-2xl backdrop-blur-2xl"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
    >
      {/* Floral accents */}
      <motion.div
        className="pointer-events-none absolute -top-6 -left-6 opacity-20"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path
            d="M60 14c8 16 2 30-6 38 16-4 32 4 36 20-16-8-30-2-38 6 4-16-4-32-20-36 16 8 30 2 38-6-4 16 4 32 20 36-16-8-30-2-38 6 4-16-4-32-20-36"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute -bottom-8 -right-6 opacity-20"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <path
            d="M70 18c10 18 2 34-8 44 18-6 36 4 42 22-18-10-34-2-44 8 6-18-4-36-22-42 18 10 34 2 44-8-6 18 4 36 22 42-18-10-34-2-44 8 6-18-4-36-22-42"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute top-10 right-6 opacity-20"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path
            d="M40 10c6 12 2 22-4 28 12-4 24 4 28 16-12-6-22-2-28 4 4-12-4-24-16-28 12 6 22 2 28-4-4 12 4 24 16 28-12-6-22-2-28 4 4-12-4-24-16-28"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/20 px-6 py-3 text-xs text-gray-500">
        <span className="font-medium tracking-wide">The Story</span>
        <span>January 18, 2026</span>
      </div>

      {/* Body */}
      <div className="relative mx-auto flex h-[calc(100%-3rem)] max-w-2xl flex-col gap-6 overflow-y-auto px-6 py-6 font-serif text-sm leading-relaxed">
        {paragraphs.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              {item.title}
            </p>
            <p className="mt-2 text-gray-700">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
