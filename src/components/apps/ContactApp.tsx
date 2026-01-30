"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send, Trash2 } from "lucide-react";

interface ContactFormState {
  fromEmail: string;
  subject: string;
  message: string;
}

export function ContactApp() {
  const [formState, setFormState] = useState<ContactFormState>({
    fromEmail: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [isInvalid, setIsInvalid] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (status !== "idle") return;
    const isValid =
      formState.fromEmail.trim() &&
      formState.subject.trim() &&
      formState.message.trim();
    if (!isValid) {
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 300);
      return;
    }

    setStatus("sending");

    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("sent");
    setFormState({ fromEmail: "", subject: "", message: "" });

    setTimeout(() => {
      setStatus("idle");
    }, 1600);
  };

  const handleDiscard = () => {
    setFormState({ fromEmail: "", subject: "", message: "" });
    setStatus("idle");
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="flex h-full flex-col rounded-3xl border border-white/20 bg-white/70 backdrop-blur-md shadow-2xl">
        {/* Toolbar */}
        <div className="border-b border-white/20 px-5 py-3 text-sm">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
              New Message
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                onClick={handleSend}
                className="flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-blue-700 transition"
                animate={isInvalid ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                transition={{ duration: 0.3 }}
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
                {status === "sending" ? "Sending..." : "Send"}
              </motion.button>
              <button
                onClick={handleDiscard}
                className="flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-3 py-1 text-xs text-gray-600 hover:text-gray-900 transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Discard
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 border-b border-white/30 pb-3">
            <span className="w-16 text-xs uppercase text-gray-400">To</span>
            <span className="text-gray-800">Lakshyaraj Singh Bhati</span>
          </div>
          <div className="mt-3 flex items-center gap-3 border-b border-white/30 pb-3">
            <span className="w-16 text-xs uppercase text-gray-400">From</span>
            <input
              type="email"
              value={formState.fromEmail}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, fromEmail: event.target.value }))
              }
              placeholder="your@email.com"
              className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>
          <div className="mt-3 flex items-center gap-3 border-b border-white/30 pb-3">
            <span className="w-16 text-xs uppercase text-gray-400">
              Subject
            </span>
            <input
              type="text"
              value={formState.subject}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, subject: event.target.value }))
              }
              placeholder="Let’s build something"
              className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 px-5 pb-5">
          <textarea
            ref={textareaRef}
            value={formState.message}
            onChange={(event) => {
              setFormState((prev) => ({ ...prev, message: event.target.value }));
              const el = textareaRef.current;
              if (el) {
                el.style.height = "auto";
                el.style.height = `${el.scrollHeight}px`;
              }
            }}
            placeholder="Tell me about your idea..."
            className="h-full w-full resize-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex flex-col items-center gap-3 rounded-2xl bg-white/90 px-6 py-5 text-sm text-gray-800 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              {status === "sending" ? (
                <>
                  <motion.div
                    className="h-10 w-10 rounded-full border-2 border-blue-500 border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  >
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  </motion.div>
                  <span>Message Sent Successfully!</span>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
