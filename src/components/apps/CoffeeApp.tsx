"use client";

import { AnimatePresence, motion } from "framer-motion";
import { InlineWidget } from "react-calendly";
import { useState } from "react";

const CALENDLY_URL = "https://calendly.com/d/ctr4-qc9-vhf";

export function CoffeeApp() {
  const [step, setStep] = useState<"form" | "booking">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.topic) return;
    setStep("booking");
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-white/5 backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl" />

      <div className="border-b border-white/10 px-5 py-3 text-xs text-white/50">
        Coffee Chat • List View
      </div>

      <div className="relative h-[calc(100%-44px)] overflow-hidden p-6 text-white">
        <AnimatePresence mode="wait">
          {step === "form" ? (
            <motion.div
              key="form"
              initial={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="mx-auto flex h-full max-w-xl flex-col justify-center gap-4"
            >
              <div>
                <h2 className="text-lg font-semibold text-white/90">
                  Let’s schedule a coffee chat
                </h2>
                <p className="text-sm text-white/60">
                  Minimal form, no friction.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-white/50">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, name: event.target.value }))
                    }
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-amber-300/60"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, email: event.target.value }))
                    }
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-amber-300/60"
                    placeholder="you@domain.com"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50">
                    What should we talk about?
                  </label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, topic: event.target.value }))
                    }
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-amber-300/60"
                    placeholder="AI, fintech, product strategy..."
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  className="w-full rounded-2xl bg-white/90 px-4 py-3 text-sm font-semibold text-black"
                >
                  Continue to booking
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="booking"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="h-full"
            >
              <InlineWidget
                url={CALENDLY_URL}
                styles={{ height: "100%", border: "none" }}
                prefill={{
                  name: formData.name,
                  email: formData.email,
                  customAnswers: {
                    a1: formData.topic,
                  },
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
