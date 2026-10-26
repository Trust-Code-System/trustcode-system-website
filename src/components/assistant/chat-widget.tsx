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
import { TrustCodePet } from "./trustcode-pet";
import { MarkdownLite } from "./markdown-lite";
import ThoughtLine from "../react-bits/ThoughtLine/ThoughtLine";
import SlingButton from "../react-bits/SlingButton/SlingButton";
import { useExperienceMotion } from "../experience/motion-preferences";

type ChatMessage = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "tc-companion-chat-v2";

const WELCOME =
  "Hi, I’m your **TrustCode companion**.\n\nBring an idea, a technical question, or a tricky next step. I can help you explore our services, understand the process, and shape a project brief.";

const QUICK_PROMPTS = [
  "What services do you offer?",
  "What would my project cost?",
  "Help me shape a project brief",
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
        typeof m.content === "string",
    );
  } catch {
    return [];
  }
}

/** Original TrustCode companion avatar. */
function AssistantMark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <TrustCodePet small />
    </span>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const typewriterRef = useRef<number | null>(null);
  const router = useRouter();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef(true);
  const { enabled } = useExperienceMotion();
  const [requestId, setRequestId] = useState(0);
  const [requestStartedAt, setRequestStartedAt] = useState(0);
  const [requestElapsed, setRequestElapsed] = useState<number | undefined>();
  const [requestPhase, setRequestPhase] = useState<
    "idle" | "waiting" | "receiving" | "complete" | "error"
  >("idle");

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
          JSON.stringify(parsed.data),
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
    [router],
  );

  // Stop any in-flight typewriter loop when the widget unmounts.
  useEffect(
    () => () => {
      if (typewriterRef.current) window.clearInterval(typewriterRef.current);
    },
    [],
  );

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
      restoreFocus.current = true;
      inputRef.current?.focus();
    } else if (wasOpen.current && restoreFocus.current) {
      launcherRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const outside = (event: PointerEvent) => {
      const target = event.target;
      if (
        !(target instanceof Node) ||
        panelRef.current?.contains(target) ||
        launcherRef.current?.contains(target)
      )
        return;
      restoreFocus.current = false;
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", outside, true);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", outside, true);
    };
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
      const startedAt = performance.now();
      setRequestStartedAt(startedAt);
      setRequestElapsed(undefined);
      setRequestId((value) => value + 1);
      setRequestPhase("waiting");

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
      let failed = false;
      let receiving = false;
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
          setRequestElapsed((performance.now() - startedAt) / 1000);
          setStreaming(false);
          setRequestPhase(failed ? "error" : "complete");
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
          setRequestElapsed((performance.now() - startedAt) / 1000);
          setStreaming(false);
          setRequestPhase("error");
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
          if (target && !receiving) {
            receiving = true;
            setRequestPhase("receiving");
          }
        }
        acc += decoder.decode();
        failed = !visibleText(acc);
        target = visibleText(acc) || FALLBACK_ERROR;
        pendingPrefill = extractPrefill(acc);
        finished = true;
      } catch {
        failed = true;
        target = target || FALLBACK_ERROR;
        finished = true;
      }
    },
    [messages, streaming, handlePrefill],
  );

  const hasConversation = messages.length > 0;

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className={`trustcode-companion-launcher ${open ? "companion-is-open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-label={
          open ? "Close TrustCode companion" : "Open TrustCode companion"
        }
        aria-expanded={open}
        aria-controls="trustcode-chat-panel"
      >
        <TrustCodePet thinking={streaming} />
        <span className="companion-tooltip">
          {open ? "Close chat" : "Ask TrustCode"}
        </span>
        <span className="companion-name">TrustCode</span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="trustcode-chat-panel"
            role="dialog"
            aria-label="TrustCode companion chat"
            initial={enabled ? { opacity: 0, y: 16, scale: 0.97 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: enabled ? 0.2 : 0, ease: "easeOut" }}
            className="trustcode-chat-panel"
          >
            {/* Header */}
            <div className="trustcode-chat-header">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/20">
                <AssistantMark className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.95rem] font-semibold leading-tight">
                  TrustCode companion
                </p>
                <p className="flex items-center gap-1.5 text-[0.72rem] text-white/85">
                  <span className="h-1.5 w-1.5 rounded-full bg-verified animate-pulse-dot" />
                  Your engineering companion
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
                <div key={i} className="companion-turn">
                  {m.role === "assistant" &&
                    i === messages.length - 1 &&
                    requestId > 0 && (
                      <ThoughtLine
                        key={requestId}
                        working={streaming}
                        startedAt={requestStartedAt}
                        elapsed={requestElapsed}
                        label={
                          requestPhase === "receiving"
                            ? "Receiving reply"
                            : "Waiting for reply"
                        }
                        doneLabel={
                          requestPhase === "error"
                            ? "Reply unavailable after"
                            : "Reply ready in"
                        }
                        steps={
                          requestPhase === "error"
                            ? []
                            : [
                                "Request sent",
                                requestPhase === "waiting"
                                  ? "Waiting for a reply"
                                  : requestPhase === "complete"
                                    ? "Reply received"
                                    : "Receiving reply",
                              ]
                        }
                        fontSize={11}
                        color="#92aacb"
                        glyphColor="#b8d0ff"
                        breathDepth={enabled ? 0.3 : 0}
                        shimmer={enabled}
                        settleDuration={enabled ? 250 : 0}
                        settleBlur={0}
                        className="companion-thought-line"
                      />
                    )}
                  {(m.content || m.role === "user") && (
                    <Bubble role={m.role}>
                      {m.role === "assistant" ? (
                        <MarkdownLite text={visibleText(m.content)} />
                      ) : (
                        <p className="whitespace-pre-wrap text-[0.875rem] leading-relaxed">
                          {m.content}
                        </p>
                      )}
                    </Bubble>
                  )}
                </div>
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
                  placeholder="What are you thinking about?"
                  aria-label="Message the TrustCode companion"
                  className="no-scrollbar max-h-28 min-h-[2.5rem] flex-1 resize-none rounded-xl border border-grid bg-paper px-3 py-2 text-[0.875rem] text-ink placeholder:text-slate focus:border-blueprint focus:outline-none"
                  onInput={(e) => {
                    const el = e.currentTarget;
                    el.style.height = "auto";
                    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
                  }}
                />
                <SlingButton
                  onSend={() => send(input)}
                  disabled={streaming || !input.trim()}
                  ariaLabel="Send message"
                  size={44}
                  padColor="#b8d0ff"
                  iconColor="#10203a"
                  accentColor="#d6e6ff"
                  wellColor="#17273c"
                  bandColor="#6b8dbd"
                  armAt={24}
                  maxPull={58}
                  flight={48}
                  particles={enabled ? 6 : 0}
                  spread={28}
                  recoil={0.12}
                  motionEnabled={enabled}
                  className="companion-sling"
                />
              </div>
              <p className="mt-1.5 text-center text-[0.65rem] text-slate">
                AI companion · Prefer the team?{" "}
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
    <div
      className={cn("flex", role === "user" ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5",
          role === "user"
            ? "rounded-br-md bg-blueprint text-paper"
            : "rounded-bl-md border border-grid bg-surface text-ink",
        )}
      >
        {children}
      </div>
    </div>
  );
}
