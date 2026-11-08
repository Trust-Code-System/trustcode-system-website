"use client";

import {
  useEffect,
  useLayoutEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "./icons";
import { motion, useReducedMotion } from "framer-motion";
import { placeDropdown } from "@/lib/dropdown-placement";

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
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [placement, setPlacement] = useState({
    top: 0,
    left: 0,
    width: 0,
    maxHeight: 256,
    above: false,
  });
  const [value, setValue] = useState(defaultValue);
  const [active, setActive] = useState(() =>
    Math.max(
      0,
      options.findIndex((o) => o.value === defaultValue),
    ),
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!open) return;
    let wasVisible = false;
    const measure = () => {
      const trigger = buttonRef.current?.getBoundingClientRect();
      if (!trigger) return;
      const viewport = window.visualViewport;
      const viewportTop = viewport?.offsetTop ?? 0;
      const viewportHeight = viewport?.height ?? window.innerHeight;
      if (trigger.bottom <= viewportTop || trigger.top >= viewportTop + viewportHeight) {
        // Keyboard focus can still be scrolling the trigger into view on opening.
        if (wasVisible) setOpen(false);
        return;
      }
      wasVisible = true;
      const next = placeDropdown(
        trigger,
        viewportTop,
        viewportHeight,
        (listRef.current?.scrollHeight ?? 254) + 2,
      );
      setPlacement(next);
    };
    measure();
    window.addEventListener("scroll", measure, true);
    window.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("scroll", measure);
    return () => {
      window.removeEventListener("scroll", measure, true);
      window.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("scroll", measure);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onClick(e: PointerEvent) {
      if (
        rootRef.current &&
        !rootRef.current.contains(e.target as Node) &&
        !listRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onClick);
    return () => document.removeEventListener("pointerdown", onClick);
  }, [open]);

  useEffect(() => {
    if (open) {
      const list = listRef.current;
      const el = list?.children[active] as HTMLElement | undefined;
      if (!list || !el) return;
      if (el.offsetTop < list.scrollTop) list.scrollTop = el.offsetTop;
      else if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) {
        list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight;
      }
    }
  }, [open, active]);

  function show() {
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  }

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
        if (!open) show();
        else setActive((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) show();
        else setActive((i) => Math.max(0, i - 1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) choose(active);
        else show();
        break;
      case "Home":
      case "End":
        e.preventDefault();
        setOpen(true);
        setActive(e.key === "Home" ? 0 : options.length - 1);
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
        ref={buttonRef}
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        onClick={() => (open ? setOpen(false) : show())}
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

      {mounted && createPortal(
        <motion.ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={id}
          aria-hidden={!open}
          inert={!open}
          initial={false}
          animate={open ? "open" : "closed"}
          variants={{
            open: { opacity: 1, y: 0, scale: 1, visibility: "visible" },
            closed: {
              opacity: 0,
              y: reduced ? 0 : placement.above ? -8 : 8,
              scale: reduced ? 1 : 0.985,
              transitionEnd: { visibility: "hidden" },
            },
          }}
          transition={{ duration: reduced ? 0.15 : 0.48, ease: [0.22, 1, 0.36, 1] }}
          style={{
            top: placement.top,
            left: placement.left,
            width: placement.width,
            maxHeight: placement.maxHeight,
            pointerEvents: open ? "auto" : "none",
            transformOrigin: placement.above ? "bottom center" : "top center",
          }}
          className="fixed z-[80] overflow-auto overscroll-contain rounded-[10px] border border-grid bg-surface p-1 shadow-lg shadow-black/10"
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
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(i)}
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
        </motion.ul>,
        document.body,
      )}
    </div>
  );
}
