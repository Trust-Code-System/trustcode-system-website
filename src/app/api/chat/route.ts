import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/assistant-knowledge";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-4-8";

// Keep requests bounded: cap history depth and message size before they
// reach the API, and rate-limit per IP (Upstash when configured, else local).
const MAX_TURNS = 20;
const WINDOW_SECONDS = 60;
const WINDOW_MS = WINDOW_SECONDS * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, { count: number; reset: number }>();

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(4000),
      })
    )
    .min(1)
    .max(40),
});

function localRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

async function redisRateLimited(ip: string): Promise<boolean | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const key = `chat:${ip}`;
  const res = await fetch(`${url.replace(/\/$/, "")}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, WINDOW_SECONDS, "NX"],
    ]),
  });

  if (!res.ok) {
    throw new Error(`Rate-limit backend failed with ${res.status}`);
  }

  const result = (await res.json()) as Array<{ result?: unknown; error?: string }>;
  if (result[0]?.error) {
    throw new Error(result[0].error);
  }

  const count = Number(result[0]?.result);
  if (!Number.isFinite(count)) {
    throw new Error("Rate-limit backend returned an invalid count");
  }

  return count > MAX_PER_WINDOW;
}

async function rateLimited(ip: string): Promise<boolean> {
  try {
    const redisLimited = await redisRateLimited(ip);
    if (redisLimited !== null) return redisLimited;
  } catch (err) {
    console.error("Chat rate-limit backend failed:", err);
  }
  return localRateLimited(ip);
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (await rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "You're sending messages a little fast, give it a minute and try again." },
      { status: 429 }
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      {
        ok: false,
        error: `The assistant is offline right now. Reach us on WhatsApp or at ${site.email}. ${site.responsePromise}`,
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 422 });
  }

  // Keep only the most recent turns and make sure history starts on "user".
  let history = parsed.data.messages.slice(-MAX_TURNS);
  const firstUser = history.findIndex((m) => m.role === "user");
  if (firstUser === -1) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 422 });
  }
  history = history.slice(firstUser);

  const messages: Anthropic.MessageParam[] = history.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const client = new Anthropic();

  const encoder = new TextEncoder();
  let streamedAnything = false;

  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const stream = client.messages.stream({
          model: MODEL,
          max_tokens: 2048,
          thinking: { type: "adaptive" },
          system: [
            {
              type: "text",
              text: buildSystemPrompt(),
              // The knowledge base is large and identical on every request
              // cache it so repeat questions cost a fraction of the first.
              cache_control: { type: "ephemeral" },
            },
          ],
          messages,
        });

        stream.on("text", (text) => {
          streamedAnything = true;
          controller.enqueue(encoder.encode(text));
        });

        const final = await stream.finalMessage();

        if (final.stop_reason === "refusal" || !streamedAnything) {
          controller.enqueue(
            encoder.encode(
              `I can't help with that one, but I'm happy to talk about your project, our services, or anything software related. You can also reach the team directly at ${site.email}.`
            )
          );
        }
        controller.close();
      } catch (err) {
        console.error("Chat stream failed:", err);
        if (!streamedAnything) {
          controller.enqueue(
            encoder.encode(
              `Sorry, I hit a snag answering that. Please try again, or reach the team on WhatsApp or at ${site.email}. ${site.responsePromise}`
            )
          );
        }
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
