"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "./icons";
import { motion } from "framer-motion";
import { useExperienceMotion } from "./experience/motion-preferences";

export type SelectOption = { value: string; label: string };

type SelectProps = {
  id: string;
  name: string;
  options: readonly SelectOption[];
  defaultValue?: string;
  placeholder?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

/**
 * Fully themed dropdown, replaces the native <select> so the open list
 * matches the design system instead of the OS-rendered chrome. A hidden
 * <input> carries the value so FormData submission is unchanged.
 */
export function Select({
  id,
  name,
  options,
  defaultValue = "",
  placeholder = "Select…",
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const { enabled } = useExperienceMotion();
  const [value, setValue] = useState(defaultValue);
  const [active, setActive] = useState(() =>
    Math.max(
      0,
      options.findIndex((o) => o.value === defaultValue),
    ),
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  useEffect(() => {
    if (open) {
      const el = listRef.current?.children[active] as HTMLElement | undefined;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [open, active]);

  function choose(i: number) {
    const opt = options[i];
    if (!opt) return;
    setValue(opt.value);
    setActive(i);
    setOpen(false);
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) setOpen(true);
        else setActive((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) setOpen(true);
        else setActive((i) => Math.max(0, i - 1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) choose(active);
        else setOpen(true);
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className="flex w-full items-center justify-between gap-2 rounded-[10px] border border-grid bg-paper px-4 py-3 text-left text-[0.95rem] text-ink focus-visible:border-blueprint focus-visible:outline-none"
      >
        <span className={selected ? "text-ink" : "text-slate/70"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <motion.ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-hidden={!open}
        inert={!open}
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { opacity: 1, y: 0, scale: 1, visibility: "visible" },
          closed: {
            opacity: 0,
            y: 8,
            scale: 0.985,
            transitionEnd: { visibility: "hidden" },
          },
        }}
        transition={{ duration: enabled ? 0.48 : 0, ease: [0.22, 1, 0.36, 1] }}
        style={{
          pointerEvents: open ? "auto" : "none",
          transformOrigin: "top center",
        }}
        className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-[10px] border border-grid bg-surface p-1 shadow-lg shadow-black/10"
      >
        {options.map((o, i) => {
          const isSelected = o.value === value;
          const isActive = i === active;
          return (
            <li
              key={o.value}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={isSelected}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                choose(i);
              }}
              className={`flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-[0.92rem] ${
                isActive ? "bg-blueprint/10 text-ink" : "text-ink/90"
              }`}
            >
              <span>{o.label}</span>
              {isSelected && (
                <Check className="h-4 w-4 shrink-0 text-blueprint" />
              )}
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
}
