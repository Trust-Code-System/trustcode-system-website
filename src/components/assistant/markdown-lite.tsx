import type { ReactNode } from "react";

/**
 * Tiny, safe markdown renderer for assistant replies. Supports the subset
 * the assistant is prompted to use — paragraphs, bullet/numbered lists,
 * **bold**, `inline code`, fenced code blocks, and links — and renders
 * everything as React nodes (no HTML injection).
 */

const INLINE =
  /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\((?:https?:\/\/|\/)[^)\s]+\)|https?:\/\/[^\s)]+)/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(INLINE);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={key}
          className="rounded bg-ink/10 px-1 py-0.5 font-mono text-[0.85em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={key}
          href={linkMatch[2]}
          target={linkMatch[2].startsWith("/") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="font-medium text-blueprint underline underline-offset-2"
        >
          {linkMatch[1]}
        </a>
      );
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={key}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all font-medium text-blueprint underline underline-offset-2"
        >
          {part.replace(/^https?:\/\//, "")}
        </a>
      );
    }
    return <span key={key}>{part}</span>;
  });
}

function renderTextBlock(block: string, keyPrefix: string): ReactNode[] {
  const lines = block.split("\n");
  const out: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushList = (key: string) => {
    if (!list) return;
    const items = list.items.map((item, i) => (
      <li key={`${key}-li-${i}`}>{renderInline(item, `${key}-li-${i}`)}</li>
    ));
    out.push(
      list.ordered ? (
        <ol
          key={key}
          className="my-1 ml-5 list-decimal space-y-1.5 marker:font-medium marker:text-slate"
        >
          {items}
        </ol>
      ) : (
        <ul
          key={key}
          className="my-1 ml-5 list-disc space-y-1.5 marker:text-blueprint"
        >
          {items}
        </ul>
      )
    );
    list = null;
  };

  lines.forEach((raw, i) => {
    const line = raw.trimEnd();
    const key = `${keyPrefix}-${i}`;
    const bullet = line.match(/^\s*[-*]\s+(.*)/);
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)/);

    if (bullet) {
      if (!list || list.ordered) flushList(`${key}-fl`);
      list = list ?? { ordered: false, items: [] };
      list.items.push(bullet[1]);
      return;
    }
    if (numbered) {
      if (!list || !list.ordered) flushList(`${key}-fl`);
      list = list ?? { ordered: true, items: [] };
      list.items.push(numbered[1]);
      return;
    }
    flushList(`${key}-fl`);
    if (!line.trim()) return;
    const heading = line.match(/^#{1,4}\s+(.*)/);
    if (heading) {
      out.push(
        <p key={key} className="pt-1 font-semibold first:pt-0">
          {renderInline(heading[1], key)}
        </p>
      );
      return;
    }
    out.push(<p key={key}>{renderInline(line, key)}</p>);
  });
  flushList(`${keyPrefix}-end`);
  return out;
}

export function MarkdownLite({ text }: { text: string }) {
  // Split on fenced code blocks first; odd indices are code.
  const segments = text.split(/```(?:\w+)?\n?([\s\S]*?)```/g);
  return (
    <div className="space-y-2.5 text-[0.875rem] leading-[1.65]">
      {segments.map((seg, i) =>
        i % 2 === 1 ? (
          <pre
            key={i}
            className="overflow-x-auto rounded-lg bg-ink/90 p-3 font-mono text-[0.78rem] leading-relaxed text-paper"
          >
            <code>{seg.replace(/\n$/, "")}</code>
          </pre>
        ) : (
          renderTextBlock(seg, `b-${i}`)
        )
      )}
    </div>
  );
}
