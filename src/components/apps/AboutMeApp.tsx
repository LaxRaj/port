"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Music2, Trophy } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 18 },
  },
};

const floating = {
  animate: {
    y: [0, -4, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

const bars = [0, 1, 2, 3, 4];

const avatar =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0' stop-color='%2384ccfa'/><stop offset='1' stop-color='%23a78bfa'/></linearGradient></defs><rect width='100%25' height='100%25' rx='250' fill='url(%23g)'/><circle cx='60%25' cy='40%25' r='120' fill='rgba(255,255,255,0.35)'/></svg>";

const sfsuLogo =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='160'><rect width='100%25' height='100%25' rx='24' fill='%230d1117'/><text x='50%25' y='54%25' text-anchor='middle' font-family='Arial' font-size='36' fill='%23ffffff'>SFSU</text></svg>";

export function AboutMeApp() {
  return (
    <div className="relative h-full w-full p-6 font-sans">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.15),transparent_45%)]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-3"
      >
        {/* Identity Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          animate={floating.animate}
          className="col-span-1 row-span-1 rounded-3xl border border-white/10 bg-black/5 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-shadow hover:shadow-[0_40px_120px_rgba(0,0,0,0.28)] dark:bg-white/5 md:col-span-2 md:row-span-2"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            Identity
          </p>
          <div className="mt-5 flex items-center gap-5">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/20">
              <Image src={avatar} alt="Lakshya portrait" fill />
            </div>
            <div>
              <p className="text-sm font-medium leading-relaxed text-white">
                Lakshyaraj Singh Bhati
              </p>
              <p className="text-sm font-medium leading-relaxed text-white/70">
                Currently in San Francisco
              </p>
              <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-200">
                <span className="text-emerald-300">●</span> Available for SE
                Roles
              </span>
            </div>
          </div>
        </motion.div>

        {/* Education Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          animate={floating.animate}
          className="col-span-1 row-span-1 rounded-3xl border border-white/10 bg-black/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-shadow hover:shadow-[0_40px_120px_rgba(0,0,0,0.28)] dark:bg-white/5"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            Education
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="relative h-12 w-20 overflow-hidden rounded-xl border border-white/10">
              <Image src={sfsuLogo} alt="SFSU logo" fill />
            </div>
            <div>
              <p className="text-sm font-medium leading-relaxed text-white">
                CS Graduate
              </p>
              <p className="text-sm font-medium leading-relaxed text-white/60">
                Dec 2025
              </p>
            </div>
          </div>
        </motion.div>

        {/* Work Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          animate={floating.animate}
          className="col-span-1 row-span-1 rounded-3xl border border-white/10 bg-black/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-shadow hover:shadow-[0_40px_120px_rgba(0,0,0,0.28)] dark:bg-white/5 md:col-span-2"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            Work
          </p>
          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-white/70">
            <p>LOOK Internship — TypeScript, React Native, MongoDB.</p>
            <p>AI Automation Agency — LangGraph, Postgres, Redis.</p>
          </div>
        </motion.div>

        {/* Sports Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          animate={floating.animate}
          className="col-span-1 row-span-1 rounded-3xl border border-white/10 bg-black/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-shadow hover:shadow-[0_40px_120px_rgba(0,0,0,0.28)] dark:bg-white/5"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            Sports
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Trophy className="h-5 w-5 text-emerald-300" />
            <p className="text-sm font-medium leading-relaxed text-white/70">
              Pac Cup + GLTF Tennis
            </p>
          </div>
          <p className="mt-3 text-sm font-medium leading-relaxed text-white/60">
            Competitive tennis & pickleball.
          </p>
        </motion.div>

        {/* Philosophy Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          animate={floating.animate}
          className="col-span-1 row-span-1 rounded-3xl border border-white/10 bg-black/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-shadow hover:shadow-[0_40px_120px_rgba(0,0,0,0.28)] dark:bg-white/5"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            Philosophy
          </p>
          <div className="mt-4 flex items-center gap-2 text-white/70">
            <BookOpen className="h-4 w-4 text-emerald-300" />
            <p className="text-sm font-medium leading-relaxed">
              The Intelligent Investor
            </p>
          </div>
          <p className="mt-3 text-sm font-medium leading-relaxed text-white/60">
            Crime and Punishment
          </p>
        </motion.div>

        {/* Spotify Module */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          animate={floating.animate}
          className="col-span-1 row-span-1 rounded-3xl border border-white/10 bg-black/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-shadow hover:shadow-[0_40px_120px_rgba(0,0,0,0.28)] dark:bg-white/5"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            Now Playing
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium leading-relaxed text-white">
                Midnight Bloom
              </p>
              <p className="text-sm font-medium leading-relaxed text-white/60">
                Focus Playlist
              </p>
            </div>
            <div className="flex items-end gap-1">
              {bars.map((bar) => (
                <span
                  key={bar}
                  className={`h-2 w-1 rounded-full bg-emerald-300/90 bar-${bar}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
            <Music2 className="h-4 w-4" />
            Now playing on repeat.
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .bar-0 {
          animation: bar 1.2s ease-in-out infinite;
        }
        .bar-1 {
          animation: bar 1.2s ease-in-out 0.1s infinite;
        }
        .bar-2 {
          animation: bar 1.2s ease-in-out 0.2s infinite;
        }
        .bar-3 {
          animation: bar 1.2s ease-in-out 0.3s infinite;
        }
        .bar-4 {
          animation: bar 1.2s ease-in-out 0.4s infinite;
        }
        @keyframes bar {
          0%,
          100% {
            transform: scaleY(0.4);
          }
          50% {
            transform: scaleY(1.4);
          }
        }
      `}</style>
    </div>
  );
}
