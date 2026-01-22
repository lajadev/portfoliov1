"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Section from "./Section";
import SkillBar from "./SkillBar";
import clsx from "clsx";
import { createPinnedScroller } from "@/lib/scrolly";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { skillsByLang, type StepKey, type Lang } from "@/data/skills";

export default function Skills() {
  const { lang } = useI18n();

  // brug lang-baseret data
  const data = skillsByLang[lang as Lang] ?? skillsByLang.da;
  const { categories, scrolly } = data;

  const [active, setActive] = useState<StepKey>(categories[0].key);

  // når sprog skifter, sørg for active stadig er valid
  useLayoutEffect(() => {
    if (!categories.some((c) => c.key === active)) {
      setActive(categories[0].key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const containerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const scrollerEl = rightRef.current;
    const panels = panelRefs.current.filter(Boolean);
    if (!container || !scrollerEl || panels.length === 0) return;

    const inst = createPinnedScroller({
      container,
      scroller: scrollerEl,
      panels,
      onStep: (i) => setActive(categories[i].key),
    });

    return () => inst.kill();
  }, [categories]);

  const currentCopy = useMemo(() => {
    return (
      scrolly.find((s) => s.key === active) ?? {
        key: active,
        title: "",
        text: "",
      }
    );
  }, [active, scrolly]);

  return (
    <Section id="skills" className="min-h-screen">
      <div ref={containerRef} className="grid gap-12 md:grid-cols-12">
        {/* LEFT */}
        <div className="md:col-span-5">
          <div className="hidden md:flex h-screen items-center">
            <div>
              <p className="mb-3 text-sm font-medium text-white/50">
                #{currentCopy.key}
              </p>
              <h2 className="text-3xl font-bold">{currentCopy.title}</h2>
              <p className="mt-3 max-w-prose text-white/75">
                {currentCopy.text}
              </p>

              <div className="mt-6 flex gap-2">
                {categories.map((c) => (
                  <span
                    key={c.key}
                    className={clsx(
                      "h-1 w-8 rounded-full transition-colors",
                      active === c.key ? "bg-[--color-accent]" : "bg-white/20",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile fallback */}
          <div className="md:hidden">
            <h2 className="text-3xl font-bold mb-2">
              {categories[0]?.title ?? "Skills"}
            </h2>
            <p className="text-white/70">Scroll</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-7">
          <div
            ref={rightRef}
            className="space-y-10 md:h-screen md:overflow-hidden md:pr-2 overscroll-contain"
            role="region"
            aria-label="Skills categories"
          >
            {categories.map((cat, i) => (
              <div
                key={cat.key}
                ref={(el) => {
                  if (el) panelRefs.current[i] = el;
                }}
                className={clsx(
                  "relative rounded-2xl p-5 shadow-[--shadow-soft] bg-white/5",
                  "min-h-[60vh] flex flex-col",
                )}
              >
                <div
                  className={clsx(
                    "mb-4 text-sm font-semibold",
                    active === cat.key
                      ? "text-[--color-accent]"
                      : "text-white/80",
                  )}
                >
                  {cat.title}
                </div>

                <div className="space-y-3">
                  {cat.items.map((s) => (
                    <SkillBar key={s.name} label={s.name} level={s.level} />
                  ))}
                </div>

                <div
                  aria-hidden
                  className={clsx(
                    "pointer-events-none absolute inset-0 rounded-2xl transition-opacity",
                    active === cat.key
                      ? "ring-1 ring-[--color-accent] opacity-100"
                      : "opacity-0",
                  )}
                />
              </div>
            ))}
            <div aria-hidden className="h-[30vh]" />
          </div>
        </div>
      </div>
    </Section>
  );
}
