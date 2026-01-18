"use client";

import { useEffect, useState } from "react";

export function Clock() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    const update = () => setNow(new Date());
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted || !now) {
    return <span className="text-[12px] text-white/60">--</span>;
  }

  const formatted = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(now);

  return <span className="text-[12px] text-white/80">{formatted}</span>;
}
