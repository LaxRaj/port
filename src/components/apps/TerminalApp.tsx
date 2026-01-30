"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
type Role = "user" | "assistant" | "system";

interface TerminalMessage {
  id: string;
  role: Role;
  content: string;
}

const systemResponses: Record<string, string> = {
  help: "Commands: whois, skills, projects, clear, contact",
  whois:
    "Lakshyaraj Singh Bhati — CS graduate (SFSU, Dec 2025). Software Engineer focused on AI Automation and Fintech.",
  skills:
    "Next.js, TypeScript, Python, NestJS, Tailwind, AI APIs (Gemini/OpenAI), Supabase, Flutter.",
  projects:
    "AI Automation Agency, Fintech Orchestrator, Portfolio Desktop OS, LOOK internship builds.",
  contact:
    "For hiring or collaboration, open the Contact app or use the Resume app in the Dock.",
};

const Typewriter = memo(function Typewriter({
  text,
  onDone,
  onTick,
}: {
  text: string;
  onDone?: () => void;
  onTick?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const onDoneRef = useRef(onDone);
  const onTickRef = useRef(onTick);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      onTickRef.current?.();
      if (index >= text.length) {
        clearInterval(interval);
        onDoneRef.current?.();
      }
    }, 12);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
});

export function TerminalApp() {
  const [messages, setMessages] = useState<TerminalMessage[]>([
    {
      id: "intro",
      role: "system",
      content:
        "Welcome. I can answer questions about Lakshyaraj's background, projects, and experience. Type 'help' to see commands.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBusy, scrollToBottom]);

  const pushMessage = (role: Role, content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `${role}-${Date.now()}`, role, content },
    ]);
  };

  const handleSubmit = async () => {
    const trimmed = input.trim();
    if (!trimmed || isBusy) return;

    pushMessage("user", trimmed);
    setInput("");

    const command = trimmed.toLowerCase();
    if (command === "clear") {
      setMessages([]);
      return;
    }

    if (command === "sudo root" || command === "sudo su") {
      pushMessage(
        "system",
        "[SYSTEM ERROR]: Unauthorized access attempt detected. Incident reported to Lakshyaraj."
      );
      pushMessage(
        "system",
        "Hint: You need \"Employee\" status to gain root access. Visit the Contact app to apply."
      );
      return;
    }

    if (systemResponses[command]) {
      pushMessage("assistant", systemResponses[command]);
      return;
    }

    setIsBusy(true);
    pushMessage(
      "system",
      "[ERROR]: Neural link offline. Check environment variables."
    );
    setIsBusy(false);
  };

  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden  border border-white/10 bg-[#0c0c0c] text-white shadow-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-y-auto px-4 py-4 font-mono text-sm">
        <div className="mb-4 pl-4 text-[12px] text-white/30">
          [System]: Neural link established. AI Assistant is active. Type
          &apos;help&apos; or use natural language.
        </div>
        {messages.map((message) => (
          <div
            key={message.id}
            className="mb-3 whitespace-pre-wrap leading-7 pl-4"
          >
            <span
              className={
                message.role === "user"
                  ? "text-white"
                  : message.role === "system"
                  ? "text-green-500"
                  : "text-blue-400"
              }
            >
              {message.role === "user"
                ? "> "
                : message.role === "system"
                ? "# "
                : "AI: "}
            </span>
            {message.role === "assistant" ? (
              <Typewriter
                text={message.content}
                onDone={scrollToBottom}
                onTick={scrollToBottom}
              />
            ) : (
              message.content
            )}
          </div>
        ))}
        {isBusy && (
          <div className="pl-4 text-blue-400">
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              [analyzing query...]
            </motion.span>
          </div>
        )}
        <div className="pl-4">
          <div className="flex items-center gap-2">
            <span className="text-teal-300">➜</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSubmit();
                }
              }}
              className="flex-1 bg-transparent text-white outline-none placeholder:text-white/30"
              placeholder="Ask about experience, skills, or projects..."
            />
            <span className="ml-1 inline-block h-4 w-2 animate-pulse text-teal-300">
              _
            </span>
          </div>
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
}
