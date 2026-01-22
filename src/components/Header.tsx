"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import clsx from "clsx";
import { site } from "@/data/site.config";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { AnimatePresence, motion } from "framer-motion";
import LanguageToggle from "@/components/i18n/LanguageToggle";
import { useI18n } from "@/components/i18n/LanguageProvider";

type NavId = (typeof site.nav)[number]["id"];

export default function Header() {
  const { tr } = useI18n();

  const [active, setActive] = useState<NavId>(site.nav[0].id);
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const [open, setOpen] = useState(false);
  const [hdrH, setHdrH] = useState(96);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const ids = useMemo(() => site.nav.map((n) => n.id) as NavId[], []);
  const isNavId = useCallback(
    (x: string): x is NavId => (ids as readonly string[]).includes(x),
    [ids],
  );

  useEffect(() => {
    let sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    let ticking = false;
    const updateActiveByCenter = () => {
      ticking = false;
      const doc = document.documentElement;
      const bottomGap =
        doc.scrollHeight - (window.scrollY + window.innerHeight);
      if (bottomGap <= 2) return setActive(ids[ids.length - 1]);
      if (window.scrollY <= 1) return setActive(ids[0]);

      const center = window.innerHeight / 2;
      let bestId: NavId = activeRef.current;
      let bestDist = Infinity;

      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - center);
        const contains = rect.top <= center && rect.bottom >= center;

        if (contains) {
          if (isNavId(el.id)) {
            bestId = el.id;
            break;
          }
        } else if (dist < bestDist && isNavId(el.id)) {
          bestId = el.id;
          bestDist = dist;
        }
      }
      setActive(bestId);
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveByCenter);
      }
    };
    updateActiveByCenter();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    const recache = () => {
      sections = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];
      onScrollOrResize();
    };
    window.addEventListener("orientationchange", recache);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("orientationchange", recache);
    };
  }, [ids, isNavId]);

  useEffect(() => {
    const measure = () => setHdrH(headerRef.current?.offsetHeight ?? 96);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!open) return;
      const p = panelRef.current;
      if (p && !p.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    window.addEventListener("keydown", onEsc);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      window.removeEventListener("keydown", onEsc);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const goTo = (id: NavId) => (e: React.MouseEvent) => {
    e.preventDefault();
    const headerH = headerRef.current?.offsetHeight ?? 96;
    smoothScrollTo(id, headerH + 8);
    setActive(id);
    setOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-[90] isolate border-b border-white/5 bg-black"
    >
      <nav
        className="mx-auto grid max-w-6xl items-center px-4 py-3 md:px-6 md:py-4
                  grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr]"
      >
        {/* left spacer */}
        <div aria-hidden />

        {/* center desktop nav */}
        <ul className="hidden justify-center gap-2 md:flex md:gap-4 md:col-start-2">
          {site.nav.map(({ id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={goTo(id as NavId)}
                aria-current={active === (id as NavId) ? "page" : undefined}
                className={clsx(
                  "rounded px-3 py-1.5 text-sm transition-colors",
                  active === (id as NavId)
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/10",
                )}
              >
                {tr(`nav.${id}`)}
              </a>
            </li>
          ))}
        </ul>

        {/* right side: desktop toggle + mobile burger */}
        <div className="justify-self-end md:col-start-3 flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageToggle />
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/10 bg-zinc-900 p-2 text-white/90 outline-none transition hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-[--color-accent]"
            aria-label={tr("nav.menu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              viewBox="0 0 24 24"
              className={clsx(
                "h-5 w-5 transition-transform duration-300",
                open ? "scale-0" : "scale-100",
              )}
              aria-hidden
            >
              <path
                fill="currentColor"
                d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z"
              />
            </svg>
            <svg
              viewBox="0 0 24 24"
              className={clsx(
                "absolute h-5 w-5 transition-transform duration-300",
                open ? "scale-100" : "scale-0",
              )}
              aria-hidden
            >
              <path
                fill="currentColor"
                d="M18.3 5.71 12 12.01l-6.3-6.3-1.41 1.41 6.3 6.3-6.3 6.3 1.41 1.41 6.3-6.3 6.29 6.3 1.42-1.41-6.3-6.3 6.3-6.3-1.42-1.41Z"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              id="mobile-menu"
              ref={panelRef}
              role="menu"
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                top: hdrH + 8,
                maxHeight: `calc(100vh - ${hdrH + 24}px)`,
              }}
              className="absolute left-3 right-3 z-[85] overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-zinc-900 p-2 shadow-[--shadow-soft]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-2 pb-2 pt-1">
                <LanguageToggle />
              </div>

              <ul className="divide-y divide-white/10">
                {site.nav.map(({ id }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={goTo(id as NavId)}
                      className={clsx(
                        "flex items-center justify-between rounded-xl px-3 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]",
                        active === (id as NavId)
                          ? "bg-white/10 text-white"
                          : "text-white/80 hover:bg-white/10",
                      )}
                    >
                      <span>{tr(`nav.${id}`)}</span>
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-white/60"
                        aria-hidden
                      >
                        <path
                          fill="currentColor"
                          d="M10 6l6 6-6 6-1.4-1.4L13.2 12 8.6 7.4 10 6z"
                        />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
