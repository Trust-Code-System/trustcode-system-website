"use client";
import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import catalog from "@/content/react-bits-catalog.json";
import { bitComponents } from "./registry";
import { sampleProps } from "./presets";
import { useExperienceMotion } from "../experience/motion-preferences";
const categories = [
  "All",
  "Text",
  "Components",
  "Micro",
  "Animation",
  "Backgrounds",
];
class ExperimentBoundary extends Component<
  { children: ReactNode; onError?: (message: string) => void },
  { error: string | null }
> {
  state = { error: null as string | null };
  static getDerivedStateFromError(e: Error) {
    return { error: e.message };
  }
  componentDidCatch(e: Error) {
    this.props.onError?.(e.message);
  }
  render() {
    return this.state.error ? (
      <div className="lab-error" role="alert">
        <span>EXPERIMENT UNAVAILABLE</span>
        <p>
          This effect could not start in this browser. Try replaying, or choose
          another experiment.
        </p>
        <details>
          <summary>Technical details</summary>
          {this.state.error}
        </details>
      </div>
    ) : (
      this.props.children
    );
  }
}
export function Experiment({
  name,
  onError,
}: {
  name: string;
  onError?: (m: string) => void;
}) {
  const Bit = bitComponents[name];
  const [feedback, setFeedback] = useState("");
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (feedback) {
      const id = setTimeout(() => setFeedback(""), 4500);
      return () => clearTimeout(id);
    }
  }, [feedback]);
  if (!Bit) return <p>Experiment not found.</p>;
  return (
    <>
      <ExperimentBoundary key={`${name}-${tick}`} onError={onError}>
        <Suspense
          fallback={<div className="lab-loading">Loading experiment…</div>}
        >
          <div className={`experiment-mount experiment-${name}`}>
            <Bit {...sampleProps(name, setFeedback)} />
          </div>
        </Suspense>
      </ExperimentBoundary>
      {feedback && (
        <div className="lab-feedback" role="status">
          {feedback}
        </div>
      )}
      <button
        className="experiment-reset"
        type="button"
        onClick={() => setTick(tick + 1)}
        aria-label="Replay experiment"
      >
        ↻
      </button>
    </>
  );
}
export function Playground() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [name, setName] = useState("LightRays");
  const [playing, setPlaying] = useState(false);
  const [replay, setReplay] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const { enabled } = useExperienceMotion();
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (catalog.some((i) => i.name === hash)) setName(hash);
  }, []);
  const item = catalog.find((i) => i.name === name)!;
  const filtered = catalog.filter(
    (i) =>
      (category === "All" || i.category === category) &&
      `${i.name} ${i.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  const select = (next: string) => {
    setName(next);
    setReplay((r) => r + 1);
    setPlaying(enabled);
    history.replaceState(null, "", `#${next}`);
    stage.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  return (
    <div className="lab-page experience-container">
      <div className="section-index">
        <span>TRUSTCODE / EXPLORATIONS</span>
        <Link href="/">BACK TO THE STUDIO ↗</Link>
      </div>
      <div className="lab-heading-row">
        <div>
          <p className="small-label">
            <span className="status-dot" /> THE INTERACTION LAB
          </p>
          <h1>
            Good things happen
            <br />
            when you <em>explore.</em>
          </h1>
        </div>
        <div className="lab-introduction">
          <p>
            218 experiments in motion, texture and feeling. A living playground
            for the details that make software memorable.
          </p>
          <a
            href="https://reactbits.dev/get-started/index"
            target="_blank"
            rel="noopener noreferrer"
          >
            Built with React Bits ↗
          </a>
        </div>
      </div>
      <div className="lab-stage" ref={stage}>
        <div className="lab-stage-bar">
          <span>
            {item.category.toUpperCase()} /{" "}
            {item.name.replace(/([a-z])([A-Z])/g, "$1 $2")}
          </span>
          <div>
            <button onClick={() => setReplay((r) => r + 1)} type="button">
              ↻ Replay
            </button>
            <button
              onClick={() => setPlaying(!playing)}
              type="button"
              aria-pressed={playing}
            >
              {playing ? "Ⅱ Pause" : "▷ Play"}
            </button>
            <Link href={`/lab/${name}`} target="_blank">
              Expand ↗
            </Link>
          </div>
        </div>
        <div
          className={`lab-canvas category-${item.category}`}
          key={`${name}-${replay}`}
        >
          {playing ? (
            <Experiment name={name} />
          ) : (
            <div className="lab-paused">
              <span className="pause-orbit" aria-hidden>
                ✳
              </span>
              <p>{item.title}</p>
              <button className="button-solid" onClick={() => setPlaying(true)}>
                Explore this experiment ↗
              </button>
              <small>
                {enabled
                  ? "Choose an experiment, then move, click or drag to discover."
                  : "Motion is paused. Play this experiment when you’re ready."}
              </small>
            </div>
          )}
        </div>
        <div className="lab-stage-caption">
          <p>{item.description}</p>
          <span>EXPLORE WITH YOUR POINTER · TOUCH · KEYBOARD</span>
        </div>
      </div>
      <div className="lab-toolbar">
        <div
          className="lab-categories"
          role="group"
          aria-label="Filter experiments"
        >
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              className={category === c ? "active" : ""}
              onClick={() => setCategory(c)}
            >
              {c}
              <span>
                {c === "All"
                  ? catalog.length
                  : catalog.filter((i) => i.category === c).length}
              </span>
            </button>
          ))}
        </div>
        <label className="lab-search">
          <span className="sr-only">Search experiments</span>
          <span aria-hidden>⌕</span>
          <input
            aria-label="Search experiments"
            placeholder="Find an experiment…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button aria-label="Clear search" onClick={() => setQuery("")}>
              ×
            </button>
          )}
        </label>
      </div>
      <p className="lab-result-count" role="status">
        {filtered.length} {filtered.length === 1 ? "experiment" : "experiments"}{" "}
        to explore
      </p>
      <div className="lab-catalog">
        {filtered.map((i, index) => (
          <button
            key={i.name}
            onClick={() => select(i.name)}
            type="button"
            aria-pressed={name === i.name}
            className={`lab-catalog-item ${name === i.name ? "selected" : ""}`}
          >
            <span className="lab-item-index">
              {String(index + 1).padStart(3, "0")}
            </span>
            <span className="lab-item-icon" aria-hidden>
              {i.category === "Text"
                ? "Aa"
                : i.category === "Micro"
                  ? "↗"
                  : i.category === "Backgrounds"
                    ? "▒"
                    : i.category === "Components"
                      ? "⌘"
                      : "✳"}
            </span>
            <span className="lab-item-title">
              {i.name.replace(/([a-z])([A-Z])/g, "$1 $2")}
              <small>{i.category}</small>
            </span>
            <span className="lab-item-arrow" aria-hidden>
              ↗
            </span>
          </button>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="lab-empty">
          <h2>No experiments found.</h2>
          <p>Try a different phrase or explore another category.</p>
          <button
            className="text-action"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            Show all experiments ↗
          </button>
        </div>
      )}
      <div className="lab-endnote">
        <span>CURIOUS ABOUT WHAT’S POSSIBLE FOR YOUR PRODUCT?</span>
        <Link href="/contact">Let’s make something remarkable ↗</Link>
      </div>
    </div>
  );
}
export function FullExperiment({ name }: { name: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="lab-fullscreen">
      <div className="lab-stage-bar">
        <Link href={`/lab#${name}`}>← Back to the lab</Link>
        <span>{name}</span>
        <button onClick={() => setPlaying(!playing)}>
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      <div className="lab-fullscreen-stage">
        {playing ? (
          <Experiment name={name} />
        ) : (
          <button className="button-solid" onClick={() => setPlaying(true)}>
            Play {name} ↗
          </button>
        )}
      </div>
    </div>
  );
}
