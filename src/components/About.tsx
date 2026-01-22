"use client";

import Section from "./Section";
import { motion } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import { useI18n } from "@/components/i18n/LanguageProvider";

export default function About() {
  const { t } = useI18n(); // her bruger vi t direkte, fordi vi har arrays/objekter

  const cards = [
    { key: "technical", data: t.about.cards.technical },
    { key: "education", data: t.about.cards.education },
    { key: "process", data: t.about.cards.process },
    { key: "now", data: t.about.cards.now },
  ] as const;

  return (
    <Section id="about">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="text-3xl font-bold">{t.about.title}</h2>
            <p className="mt-4 text-white/80">{t.about.intro}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {t.about.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <Link
                href="#projects"
                className="rounded-md bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
              >
                {t.about.ctaProjects}
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-7">
          <div className="grid gap-6 md:grid-cols-2">
            {cards.map(({ key, data }) => (
              <Card key={key} title={data.title}>
                <ul className="space-y-2 text-sm text-white/80">
                  {data.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Card({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4 }}
      className={clsx(
        "rounded-2xl bg-white/5 p-5 shadow-[--shadow-soft] backdrop-blur",
        className,
      )}
    >
      <h3 className="mb-3 text-sm font-semibold text-white/90">{title}</h3>
      {children}
    </motion.div>
  );
}
