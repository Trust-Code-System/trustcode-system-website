"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { analyticsCopy } from "@/content/privacy";
import { analyticsUrl, CONSENT_KEY, GA_MEASUREMENT_ID, readAnalyticsChoice, type AnalyticsChoice } from "@/lib/analytics-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    trustcodeAnalyticsSettingsRequested?: boolean;
  }
}

export function AnalyticsSettingsButton() {
  return <button type="button" className="analytics-settings-button" onClick={() => {
    // A footer can hydrate before the root controller's effect has mounted.
    window.trustcodeAnalyticsSettingsRequested = true;
    window.dispatchEvent(new Event("trustcode:analytics-settings"));
  }}>{analyticsCopy.settings}</button>;
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<AnalyticsChoice | null>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [production, setProduction] = useState(false);
  const [storageBlocked, setStorageBlocked] = useState(false);
  const acceptButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let saved: AnalyticsChoice | null = null;
    try { saved = readAnalyticsChoice(localStorage.getItem(CONSENT_KEY)); } catch { /* Default to no consent. */ }
    setChoice(saved);
    setVisible(saved === null);
    setProduction(["trustcodesystem.tech", "www.trustcodesystem.tech"].includes(location.hostname));
    const open = () => { window.trustcodeAnalyticsSettingsRequested = false; setVisible(true); requestAnimationFrame(() => acceptButton.current?.focus()); };
    const sync = (event: StorageEvent) => { if (event.key === CONSENT_KEY) location.reload(); };
    window.addEventListener("trustcode:analytics-settings", open);
    window.addEventListener("storage", sync);
    if (window.trustcodeAnalyticsSettingsRequested) open();
    return () => {
      window.removeEventListener("trustcode:analytics-settings", open);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    if (!ready || choice !== "accepted") return;
    window.gtag?.("set", { page_location: analyticsUrl(location.href), page_referrer: analyticsUrl(document.referrer) });
    window.gtag?.("event", "page_view", {
      page_location: analyticsUrl(location.href),
      page_referrer: analyticsUrl(document.referrer),
      page_title: document.title,
    });
  }, [pathname, ready, choice]);

  useEffect(() => {
    if (!ready || choice !== "accepted") return;
    const trackContact = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      if (!anchor) return;
      const url = new URL(anchor.href, location.origin);
      const method = url.protocol === "mailto:" ? "email" : url.protocol === "tel:" ? "phone" : ["wa.me", "api.whatsapp.com"].includes(url.hostname) ? "whatsapp" : url.hostname === "calendly.com" ? "booking" : null;
      if (method) window.gtag?.("event", "contact_click", { contact_method: method, page_location: analyticsUrl(location.href) });
    };
    document.addEventListener("click", trackContact);
    return () => document.removeEventListener("click", trackContact);
  }, [ready, choice]);

  function choose(next: AnalyticsChoice) {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice: next, savedAt: Date.now() })); }
    catch {
      // A failed settings write must never keep a running tag enabled.
      (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      try { localStorage.removeItem(CONSENT_KEY); } catch { /* Storage may be unavailable. */ }
      setChoice(null);
      setReady(false);
      setStorageBlocked(true);
      return;
    }
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = next === "declined";
    if (next === "declined") {
      // Disable an already-loaded tag before the reload removes it. Do not send
      // a cookieless consent ping after the visitor withdraws permission.
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.split("=")[0].trim();
        if (!/^_ga(?:_|$)/.test(name)) continue;
        for (const domain of ["", `; domain=${location.hostname}`, "; domain=.trustcodesystem.tech"]) {
          document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
        }
      }
    }
    setChoice(next);
    setVisible(false);
    // Remove an already-running tag on withdrawal; accepting never interrupts
    // an enquiry a visitor may be writing elsewhere on the page.
    if (choice === "accepted" && next === "declined") location.reload();
  }

  return <>
    {choice === "accepted" && production && <Script
      id="trustcode-google-analytics"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
      onReady={() => {
        window.dataLayer = window.dataLayer || [];
        // Google's command queue expects an Arguments object, as in its snippet.
        // eslint-disable-next-line prefer-rest-params
        window.gtag = function () { window.dataLayer!.push(arguments); };
        window.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
        window.gtag("js", new Date());
        window.gtag("set", { page_location: analyticsUrl(location.href), page_referrer: analyticsUrl(document.referrer) });
        window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
        setReady(true);
      }}
    />}
    {visible && <section className="analytics-consent" aria-labelledby="analytics-consent-title">
      <div>
        <h2 id="analytics-consent-title">{analyticsCopy.title}</h2>
        <p>{analyticsCopy.description} <Link href="/privacy">Privacy notice</Link></p>
        {storageBlocked && <p role="status">Your browser could not save this choice. Google Analytics remains off.</p>}
      </div>
      <div className="analytics-consent-actions">
        <button ref={acceptButton} type="button" onClick={() => choose("accepted")}>{analyticsCopy.accept}</button>
        <button type="button" onClick={() => choose("declined")}>{analyticsCopy.decline}</button>
        {choice && <button type="button" onClick={() => setVisible(false)}>Keep current choice</button>}
      </div>
    </section>}
  </>;
}
