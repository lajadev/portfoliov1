"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/data/site.config";
import Section from "./Section";
import { useI18n } from "@/components/i18n/LanguageProvider";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 60]);
  const { t } = useI18n();

  return (
    <Section id="hero">
      <div className="grid gap-6 md:grid-cols-12 md:gap-10">
        <div className="col-span-7">
          <motion.p
            className="mb-2 text-base text-[--color-accent]"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.hero.hello}
          </motion.p>

          <motion.h1
            className="text-4xl font-extrabold leading-tight md:text-6xl"
            style={{ y }}
          >
            {site.name}.<br />
            <span className="text-white/70">{t.hero.tagline}</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-white/80"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {t.hero.role}
          </motion.p>

          <div className="mt-8 flex gap-3">
            <a
              href="#projects"
              className="rounded-md border border-[--color-accent] px-4 py-2 text-sm text-[--color-accent] hover:bg-[--color-accent]/10"
            >
              {t.hero.ctaProjects}
            </a>
            <a
              href="#skills"
              className="rounded-md bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
            >
              {t.hero.ctaSkills}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
