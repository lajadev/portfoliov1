"use client";

import Section from "./Section";
import { site } from "@/data/site.config";
import { motion } from "framer-motion";
import { useI18n } from "@/components/i18n/LanguageProvider";

export default function Contact() {
  const { tr } = useI18n();

  return (
    <Section id="contact">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-3xl font-bold">{tr("contact.title")}</h2>
        <p className="mt-3 text-white/80">{tr("contact.text")}</p>

        <div className="mt-6">
          <a
            href={`mailto:${site.email}`}
            className="inline-block rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium hover:bg-white/15"
          >
            {tr("contact.ctaPrefix")} {site.email}
          </a>
        </div>
      </motion.div>
    </Section>
  );
}
