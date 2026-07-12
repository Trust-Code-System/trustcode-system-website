"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import {
  PREFILL_OPEN,
  PREFILL_CLOSE,
  PREFILL_STORAGE_KEY,
  PREFILL_EVENT,
  prefillSchema,
} from "@/lib/contact-prefill";
import { MarkdownLite } from "./markdown-lite";

type ChatMessage = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "tc-assistant-chat";
const NUDGE_KEY = "tc-assistant-nudge";

const WELCOME =
  "Hi, I'm the **TrustCode Assistant** 👋: part engineer, part front desk.\n\nAsk me anything about our services, portfolio, or process, or bring your toughest technical question. Web, cloud, AI, security: all of it.";

const QUICK_PROMPTS = [
  "What services do you offer?",
  "What would my project cost?",
  "Show me your live products",
  "I have a technical question",
];

const FALLBACK_ERROR = `Sorry, I couldn't reach the assistant just now. Please try again, or contact the team directly at ${site.email}. ${site.responsePromise}`;

/**
 * Belt and braces for the "no em dashes" house style: the model is
 * instructed not to use them, and anything that slips through is rewritten
 * here on the accumulated text (so chunk boundaries can't split a range).
 */
function humanize(text: string): string {
  // Strip em (U+2014) and en (U+2013) dashes only. Never touch ASCII hyphens.
  return text
    .replace(/(\d)\s*[\u2013\u2014]\s*(\d)/g, "$1-$2")
    .replace(/\s*[\u2013\u2014]\s*/g, ", ");
}

/** Everything the visitor sees: the reply minus the hidden prefill block. */
function visibleText(text: string): string {
  const i = text.indexOf(PREFILL_OPEN);
  return (i === -1 ? text : text.slice(0, i)).trimEnd();
}

/** Pull and parse the hidden prefill JSON, if the reply carried one. */
function extractPrefill(text: string): unknown | null {
  const start = text.indexOf(PREFILL_OPEN);
  if (start === -1) return null;
  const rest = text.slice(start + PREFILL_OPEN.length);
  const end = rest.indexOf(PREFILL_CLOSE);
  const json = (end === -1 ? rest : rest.slice(0, end)).trim();
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function loadMessages(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatMessage[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    );
  } catch {
    return [];
  }
}

/**
 * The TrustCode Assistant mark: the brand checkmark with an AI spark.
 * One glyph used on the launcher and the panel header.
 */
function AssistantMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path
        d="M7.5 17.5l5 5L23 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.5 3.5l1.1 2.9 2.9 1.1-2.9 1.1-1.1 2.9-1.1-2.9-2.9-1.1 2.9-1.1z"
        fill="currentColor"
      />
      <path
        d="M28.5 13.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const typewriterRef = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMessages(loadMessages());
  }, []);

  // Hand a validated prefill to the contact form, then take the visitor there.
  // We only ever fill, the visitor reviews and submits themselves.
  const handlePrefill = useCallback(
    (raw: unknown) => {
      const parsed = prefillSchema.safeParse(raw);
      if (!parsed.success) return;
      try {
        sessionStorage.setItem(
          PREFILL_STORAGE_KEY,
          JSON.stringify(parsed.data)
        );
      } catch {
        // storage unavailable, the form just opens empty; not fatal
      }
      // Covers the "already on /contact" case where the form is mounted.
      window.dispatchEvent(new CustomEvent(PREFILL_EVENT));
      router.push("/contact");
      // On phones the panel covers the page, so step aside to reveal the form.
      if (window.matchMedia("(max-width: 639px)").matches) {
        setOpen(false);
      }
    },
    [router]
  );

  // Stop any in-flight typewriter loop when the widget unmounts.
  useEffect(
    () => () => {
      if (typewriterRef.current) window.clearInterval(typewriterRef.current);
    },
    []
  );

  // Friendly nudge bubble a few seconds after landing, once per session.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(NUDGE_KEY)) return;
    } catch {
      return;
    }
    const t = setTimeout(() => setNudge(true), 3500);
    return () => clearTimeout(t);
  }, []);

  const dismissNudge = useCallback(() => {
    setNudge(false);
    try {
      sessionStorage.setItem(NUDGE_KEY, "1");
    } catch {
      // fine, the nudge just reappears next page load
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
    } catch {
      // storage full/unavailable, chat still works, just won't persist
    }
  }, [messages]);

  // Pin the transcript to the bottom as replies stream in.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      dismissNudge();
      inputRef.current?.focus();
    }
  }, [open, dismissNudge]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      const history: ChatMessage[] = [
        ...messages,
        { role: "user", content: trimmed.slice(0, 4000) },
      ];
      setMessages([...history, { role: "assistant", content: "" }]);
      setInput("");
      setStreaming(true);

      const setReply = (content: string) =>
        setMessages([...history, { role: "assistant", content }]);

      // Typewriter: the network delivers text in bursts, but we reveal it at a
      // steady pace so it reads like the assistant is typing. A subtle haptic
      // pulse rides along on phones that support the Vibration API.
      let target = "";
      let shown = 0;
      let finished = false;
      let lastHaptic = 0;
      let pendingPrefill: unknown | null = null;
      const canVibrate =
        typeof navigator !== "undefined" &&
        typeof navigator.vibrate === "function";

      const stopTypewriter = () => {
        if (typewriterRef.current) {
          window.clearInterval(typewriterRef.current);
          typewriterRef.current = null;
        }
      };

      typewriterRef.current = window.setInterval(() => {
        if (shown < target.length) {
          // Ease out: reveal faster when far behind, gentler near the end.
          const step = Math.max(1, Math.ceil((target.length - shown) / 12));
          shown = Math.min(target.length, shown + step);
          setReply(humanize(target.slice(0, shown)));
          const now = Date.now();
          if (canVibrate && now - lastHaptic > 110) {
            lastHaptic = now;
            navigator.vibrate(3);
          }
        }
        if (finished && shown >= target.length) {
          stopTypewriter();
          setStreaming(false);
          // Once the visible confirmation has finished typing, open the form.
          if (pendingPrefill) {
            const p = pendingPrefill;
            pendingPrefill = null;
            handlePrefill(p);
          }
        }
      }, 18);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history.slice(-20) }),
        });

        if (!res.ok || !res.body) {
          stopTypewriter();
          let msg = FALLBACK_ERROR;
          try {
            const data = (await res.json()) as { error?: string };
            if (data?.error) msg = data.error;
          } catch {
            // non-JSON error body: keep the generic fallback
          }
          setReply(msg);
          setStreaming(false);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          // Reveal only the visible part; the hidden prefill block never types.
          target = visibleText(acc);
        }
        acc += decoder.decode();
        target = visibleText(acc) || FALLBACK_ERROR;
        pendingPrefill = extractPrefill(acc);
        finished = true;
      } catch {
        target = target || FALLBACK_ERROR;
        finished = true;
      }
    },
    [messages, streaming, handlePrefill]
  );

  const hasConversation = messages.length > 0;

  return (
    <>
      {/* Nudge bubble */}
      <AnimatePresence>
        {nudge && !open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-7 right-[5.5rem] z-50 print:hidden"
          >
            <div className="relative flex items-center gap-2 rounded-2xl rounded-br-md border border-grid bg-surface py-2.5 pl-4 pr-2 shadow-xl">
              <button
                type="button"
                onClick={() => {
                  dismissNudge();
                  setOpen(true);
                }}
                className="text-[0.85rem] font-medium text-ink"
              >
                Ask TrustCode anything
              </button>
              <button
                type="button"
                onClick={dismissNudge}
                aria-label="Dismiss"
                className="rounded-md p-1 text-slate transition-colors hover:text-ink"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher, gradient squircle with the TrustCode assistant mark */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close the TrustCode Assistant" : "Chat with the TrustCode Assistant"}
        aria-expanded={open}
        className="group fixed bottom-5 right-5 z-50 h-14 w-14 rounded-2xl text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus-visible:outline-2 print:hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--blueprint) 0%, var(--accent-2) 100%)",
        }}
      >
        {/* soft breathing halo */}
        <span
          aria-hidden
          className="absolute -inset-1 -z-10 rounded-[20px] opacity-40 blur-md transition-opacity duration-300 group-hover:opacity-60"
          style={{
            background:
              "linear-gradient(135deg, var(--blueprint), var(--accent-2))",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/25"
        />
        <span className="relative flex h-full w-full items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </motion.svg>
            ) : (
              <motion.span
                key="mark"
                initial={{ rotate: 45, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -45, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <AssistantMark className="h-7 w-7" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="TrustCode Assistant chat"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-3 bottom-[5.5rem] top-16 z-50 flex flex-col overflow-hidden rounded-2xl border border-grid bg-paper shadow-2xl sm:inset-x-auto sm:top-auto sm:right-5 sm:h-[min(640px,calc(100dvh-8rem))] sm:w-[400px] print:hidden"
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 text-white"
              style={{
                background:
                  "linear-gradient(120deg, var(--blueprint), var(--accent-2))",
              }}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/20">
                <AssistantMark className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.95rem] font-semibold leading-tight">
                  TrustCode Assistant
                </p>
                <p className="flex items-center gap-1.5 text-[0.72rem] text-white/85">
                  <span className="h-1.5 w-1.5 rounded-full bg-verified animate-pulse-dot" />
                  Online · replies in seconds
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-md p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Transcript */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              <Bubble role="assistant">
                <MarkdownLite text={WELCOME} />
              </Bubble>

              {messages.map((m, i) => (
                <Bubble key={i} role={m.role}>
                  {m.role === "assistant" ? (
                    m.content ? (
                      <MarkdownLite text={visibleText(m.content)} />
                    ) : (
                      <TypingDots />
                    )
                  ) : (
                    <p className="whitespace-pre-wrap text-[0.875rem] leading-relaxed">
                      {m.content}
                    </p>
                  )}
                </Bubble>
              ))}

              {!hasConversation && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_PROMPTS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="rounded-full border border-grid bg-surface px-3 py-1.5 text-[0.8rem] font-medium text-ink transition-colors hover:border-blueprint hover:text-blueprint"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-grid bg-surface px-3 pb-2.5 pt-2.5"
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  maxLength={4000}
                  placeholder="Ask about services, portfolio, or anything technical…"
                  aria-label="Message the TrustCode Assistant"
                  className="no-scrollbar max-h-28 min-h-[2.5rem] flex-1 resize-none rounded-xl border border-grid bg-paper px-3 py-2 text-[0.875rem] text-ink placeholder:text-slate focus:border-blueprint focus:outline-none"
                  onInput={(e) => {
                    const el = e.currentTarget;
                    el.style.height = "auto";
                    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
                  }}
                />
                <button
                  type="submit"
                  disabled={streaming || !input.trim()}
                  aria-label="Send message"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blueprint text-white transition-opacity disabled:opacity-40"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[18px] w-[18px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
              <p className="mt-1.5 text-center text-[0.65rem] text-slate">
                TrustCode AI · Prefer a human?{" "}
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blueprint hover:underline"
                >
                  WhatsApp
                </a>{" "}
                or{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-blueprint hover:underline"
                >
                  email
                </a>
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex", role === "user" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5",
          role === "user"
            ? "rounded-br-md bg-blueprint text-white"
            : "rounded-bl-md border border-grid bg-surface text-ink"
        )}
      >
        {children}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-slate animate-pulse-dot"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </span>
  );
}
