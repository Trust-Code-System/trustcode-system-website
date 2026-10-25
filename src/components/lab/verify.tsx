"use client";
import { useEffect, useRef, useState } from "react";
import catalog from "@/content/react-bits-catalog.json";
import { Experiment } from "./playground";
type RecordItem = {
  name: string;
  status: "mounted" | "error" | "timeout";
  detail?: string;
  canvasCount: number;
  imageCount: number;
  durationMs: number;
};
export function LabVerification() {
  const [running, setRunning] = useState(false);
  const [index, setIndex] = useState(0);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const container = useRef<HTMLDivElement>(null);
  const error = useRef<string | null>(null);
  const completed = records.length === catalog.length;
  useEffect(() => {
    if (!running || index >= catalog.length) return;
    error.current = null;
    let finished = false;
    const start = performance.now();
    let settle: ReturnType<typeof setTimeout> | undefined;
    const report = (status: RecordItem["status"]) => {
      if (finished) return;
      finished = true;
      const record: RecordItem = {
        name: catalog[index].name,
        status: error.current ? "error" : status,
        ...(error.current ? { detail: error.current } : {}),
        canvasCount: container.current?.querySelectorAll("canvas").length || 0,
        imageCount: container.current?.querySelectorAll("img").length || 0,
        durationMs: Math.round(performance.now() - start),
      };
      setRecords((old) => [...old, record]);
      setIndex((old) => old + 1);
    };
    const asyncError = (e: ErrorEvent) => {
      error.current = e.message;
      e.preventDefault();
    };
    const rejection = (e: PromiseRejectionEvent) => {
      error.current = String(e.reason?.message || e.reason);
      e.preventDefault();
    };
    window.addEventListener("error", asyncError);
    window.addEventListener("unhandledrejection", rejection);
    const interval = setInterval(() => {
      if (
        container.current &&
        !container.current.querySelector(".lab-loading") &&
        !settle
      ) {
        settle = setTimeout(() => report("mounted"), 1500);
      }
    }, 200);
    const timeout = setTimeout(() => report("timeout"), 20000);
    return () => {
      finished = true;
      clearInterval(interval);
      clearTimeout(timeout);
      clearTimeout(settle);
      window.removeEventListener("error", asyncError);
      window.removeEventListener("unhandledrejection", rejection);
    };
  }, [running, index]);
  const download = () => {
    const url = URL.createObjectURL(
      new Blob(
        [
          JSON.stringify(
            {
              testedAt: new Date().toISOString(),
              userAgent: navigator.userAgent,
              scope:
                "Initial mount and asynchronous errors only. Visual quality, every pointer/keyboard interaction and device compatibility require separate review.",
              records,
            },
            null,
            2,
          ),
        ],
        { type: "application/json" },
      ),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "trustcode-react-bits-runtime-check.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="experience-container py-12">
      <h1 className="display-h1">Component runtime check</h1>
      <p className="lead mt-5">
        Sequentially mount all 218 components. This checks startup errors, not
        complete visual or interaction correctness.
      </p>
      <div className="flex gap-4 my-8">
        <button
          className="btn-primary"
          onClick={() => setRunning(!running)}
          disabled={completed}
        >
          {running ? "Pause check" : "Start check"}
        </button>
        <button
          className="btn-secondary"
          onClick={download}
          disabled={!records.length}
        >
          Download results
        </button>
      </div>
      <p role="status" data-testid="verification-status">
        {records.length}/{catalog.length} checked ·{" "}
        {records.filter((r) => r.status === "error").length} errors ·{" "}
        {records.filter((r) => r.status === "timeout").length} timeouts
        {completed
          ? " · Complete"
          : running
            ? ` · ${catalog[index]?.name}`
            : " · Paused"}
      </p>
      <div className="lab-canvas lab-stage my-8" ref={container}>
        {running && index < catalog.length && (
          <Experiment
            key={index}
            name={catalog[index].name}
            onError={(message) => {
              error.current = message;
            }}
          />
        )}
      </div>
      <pre
        id="runtime-results"
        style={{
          fontSize: 10,
          whiteSpace: "pre-wrap",
          maxHeight: 400,
          overflow: "auto",
        }}
      >
        {JSON.stringify(records, null, 2)}
      </pre>
    </div>
  );
}
