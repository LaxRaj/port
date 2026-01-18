"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getMonthMatrix(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const offset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();
  const totalCells = Math.ceil((offset + daysInMonth) / 7) * 7;

  const days = Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - offset + 1;
    const inMonth = dayNumber >= 1 && dayNumber <= daysInMonth;
    const dayDate = new Date(year, month, dayNumber);
    const weekday = dayDate.getDay();
    const isAvailable = inMonth && (weekday === 1 || weekday === 3 || weekday === 5);
    return {
      key: `${year}-${month}-${dayNumber}`,
      label: inMonth ? dayNumber : "",
      inMonth,
      isAvailable,
      date: inMonth ? dayDate : null,
    };
  });

  return days;
}

export function CoffeeApp() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [dateError, setDateError] = useState(false);

  const today = useMemo(() => new Date(), []);
  const monthLabel = today.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  const days = useMemo(() => getMonthMatrix(today), [today]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedDate) {
      setDateError(true);
      return;
    }

    setDateError(false);
    const recipient = "lbhati2804@gmail.com";
    const subject = `Meeting Request - ${formData.subject}`;
    const body = [
      `Request from: ${formData.email}`,
      `Requested date: ${selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      })}`,
      "",
      "Please confirm availability.",
    ].join("\n");

    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    if (typeof window !== "undefined") {
      window.location.href = mailto;
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3200);
  };

  return (
    <div className="relative h-full w-full p-6">
      <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2">
        {/* Calendar */}
        <div className="rounded-3xl border border-white/20 bg-white/70 p-5 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Availability
              </p>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">
                {monthLabel}
              </h3>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 shadow">
              <CalendarDays className="h-6 w-6 text-gray-700" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-2 text-xs text-gray-500">
            {weekdayLabels.map((label) => (
              <div key={label} className="text-center">
                {label}
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-7 gap-2">
            {days.map((day) => (
              <motion.button
                key={day.key}
                type="button"
                onClick={() => day.isAvailable && setSelectedDate(day.date)}
                className={[
                  "flex h-10 items-center justify-center rounded-xl text-sm",
                  day.inMonth ? "text-gray-800" : "text-gray-300",
                  day.isAvailable
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    : "bg-white/60",
                  selectedDate?.toDateString() === day.date?.toDateString()
                    ? "ring-2 ring-emerald-400"
                    : "",
                ].join(" ")}
                whileHover={{ scale: day.isAvailable ? 1.05 : 1 }}
                whileTap={{ scale: day.isAvailable ? 0.97 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {day.label}
              </motion.button>
            ))}
          </div>

          <div className="mt-5 text-xs text-gray-500">
            Available days are highlighted in emerald (Mon/Wed/Fri).
          </div>
        </div>

        {/* Booking Form */}
        <div className="rounded-3xl border border-white/20 bg-white/70 p-6 backdrop-blur-md shadow-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Meeting Request
          </p>
          <h3 className="mt-2 text-xl font-semibold text-gray-900">
            Schedule a coffee chat
          </h3>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs text-gray-600">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, email: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-white/30 bg-white/80 px-4 py-3 text-sm text-gray-800 outline-none transition focus:ring-2 focus:ring-emerald-400"
                placeholder="you@domain.com"
              />
            </div>

            <div>
              <label className="text-xs text-gray-600">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, subject: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-white/30 bg-white/80 px-4 py-3 text-sm text-gray-800 outline-none transition focus:ring-2 focus:ring-emerald-400"
                placeholder="What should we talk about?"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              disabled={!selectedDate}
            >
              Request Meeting
            </motion.button>

            {dateError && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-600">
                Please select an available day before requesting a meeting.
              </div>
            )}

            {selectedDate && (
              <div className="rounded-2xl border border-white/30 bg-white/80 px-4 py-3 text-xs text-gray-600">
                Selected: {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
              </div>
            )}
          </form>
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            className="absolute right-6 top-6 flex items-center gap-3 rounded-2xl border border-white/30 bg-white/90 px-4 py-3 text-sm text-gray-800 shadow-2xl backdrop-blur-md"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            Meeting Requested!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
