"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Music2, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

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

const hoverTilt = {
  rotateX: -2,
  rotateY: 2,
  transition: { type: "spring", stiffness: 220, damping: 16 },
};

const bars = [0, 1, 2, 3, 4, 5, 6];

const avatar =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0' stop-color='%237dd3fc'/><stop offset='1' stop-color='%23a78bfa'/></linearGradient></defs><rect width='100%25' height='100%25' rx='300' fill='url(%23g)'/><circle cx='65%25' cy='35%25' r='140' fill='rgba(255,255,255,0.35)'/></svg>";

function useSanFranciscoTime() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);
  return time;
}

export function AboutMeApp() {
  const sfTime = useSanFranciscoTime();

  return (
    <div className="relative h-full w-full p-6 font-sans">
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-60"
        animate={{ opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.2),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.2),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_80%,rgba(167,139,250,0.2),transparent_50%)]" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-3"
      >
        {/* Identity Tile */}
        <motion.div
          variants={cardVariants}
          whileHover={hoverTilt}
          className="col-span-1 row-span-1 rounded-3xl border border-white/10 bg-black/5 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-xl dark:bg-white/5 md:col-span-2 md:row-span-2"
          style={{ transformStyle: "preserve-3d" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            Identity
          </p>
          <div className="mt-5 flex items-center gap-5">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border border-white/20">
              <Image src={avatar} alt="Lakshya portrait" fill />
            </div>
            <div>
              <p className="text-sm font-medium leading-relaxed text-white">
                Lakshyaraj Singh Bhati
              </p>
              <p className="text-sm font-medium leading-relaxed text-white/70">
                Building AI and playing tennis in the fog.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-200">
                <span className="text-emerald-300">●</span> Available for SE
                Roles
              </span>
            </div>
          </div>
        </motion.div>

        {/* Music Module */}
        <motion.div
          variants={cardVariants}
          whileHover={hoverTilt}
          className="col-span-1 row-span-1 rounded-3xl border border-white/10 bg-black/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-xl dark:bg-white/5"
          style={{ transformStyle: "preserve-3d" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            Recently Played
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium leading-relaxed text-white">
                Sunday Focus
              </p>
              <p className="text-sm font-medium leading-relaxed text-white/60">
                Spotify Playlist
              </p>
            </div>
            <div className="flex items-end gap-1">
              {bars.map((bar) => (
                <span
                  key={bar}
                  className={`h-2 w-1 rounded-full bg-emerald-300/90 wave-${bar}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
            <Music2 className="h-4 w-4" />
            Synthwave + Lo-fi blend
          </div>
        </motion.div>

        {/* Tennis Tile */}
        <motion.div
          variants={cardVariants}
          whileHover={hoverTilt}
          className="col-span-1 row-span-1 rounded-3xl border border-white/10 bg-black/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-xl dark:bg-white/5"
          style={{ transformStyle: "preserve-3d" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            Tennis
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Trophy className="h-5 w-5 text-emerald-300" />
            <p className="text-sm font-medium leading-relaxed text-white/70">
              GLTF 7.5 Combo
            </p>
          </div>
          <p className="mt-3 text-sm font-medium leading-relaxed text-white/60">
            Pac Cup &apos;24
          </p>
        </motion.div>

        {/* Pickleball Tile */}
        <motion.div
          variants={cardVariants}
          whileHover={hoverTilt}
          className="col-span-1 row-span-1 rounded-3xl border border-white/10 bg-black/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-xl dark:bg-white/5"
          style={{ transformStyle: "preserve-3d" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            Pickleball
          </p>
          <p className="mt-4 text-sm font-medium leading-relaxed text-white/70">
            SFSU Intramural participation
          </p>
        </motion.div>

        {/* Bookshelf */}
        <motion.div
          variants={cardVariants}
          whileHover={hoverTilt}
          className="col-span-1 row-span-1 rounded-3xl border border-white/10 bg-black/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-xl dark:bg-white/5"
          style={{ transformStyle: "preserve-3d" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            Bookshelf
          </p>
          <div className="mt-4 flex items-center gap-2 text-white/70">
            <BookOpen className="h-4 w-4 text-emerald-300" />
            <p className="text-sm font-medium leading-relaxed">
              Finance
            </p>
          </div>
          <div className="mt-3 flex items-end gap-2">
            <div className="h-16 w-6 rounded-md bg-emerald-300/70" />
            <div className="h-20 w-6 rounded-md bg-blue-400/60" />
            <div className="h-14 w-6 rounded-md bg-purple-400/60" />
            <div className="h-18 w-6 rounded-md bg-white/40" />
          </div>
          <div className="mt-4 text-xs text-white/60">
            The Intelligent Investor · The Psychology of Money
          </div>
          <div className="mt-4 text-sm font-medium leading-relaxed text-white/70">
            Classics
          </div>
          <div className="mt-2 text-xs text-white/60">
            Crime and Punishment · The Picture of Dorian Gray
          </div>
        </motion.div>

        {/* Location/Mood */}
        <motion.div
          variants={cardVariants}
          whileHover={hoverTilt}
          className="col-span-1 row-span-1 rounded-3xl border border-white/10 bg-black/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-xl dark:bg-white/5"
          style={{ transformStyle: "preserve-3d" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            Location / Mood
          </p>
          <p className="mt-4 text-sm font-medium leading-relaxed text-white/70">
            {sfTime || "SF Time loading..."}
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            Hayes Valley
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .wave-0 {
          animation: wave 1.2s ease-in-out infinite;
        }
        .wave-1 {
          animation: wave 1.2s ease-in-out 0.1s infinite;
        }
        .wave-2 {
          animation: wave 1.2s ease-in-out 0.2s infinite;
        }
        .wave-3 {
          animation: wave 1.2s ease-in-out 0.3s infinite;
        }
        .wave-4 {
          animation: wave 1.2s ease-in-out 0.4s infinite;
        }
        .wave-5 {
          animation: wave 1.2s ease-in-out 0.5s infinite;
        }
        .wave-6 {
          animation: wave 1.2s ease-in-out 0.6s infinite;
        }
        @keyframes wave {
          0%,
          100% {
            transform: scaleY(0.4);
          }
          50% {
            transform: scaleY(1.6);
          }
        }
      `}</style>
    </div>
  );
}
