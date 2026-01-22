"use client";

import Section from "./Section";
import { motion } from "framer-motion";
import clsx from "clsx";
import SitePreview from "./SitePreview";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { projectsByLang, type Lang, type Project } from "@/data/projects";

export default function Projects() {
  const { lang, tr } = useI18n();

  const data = projectsByLang[lang as Lang] ?? projectsByLang.da;
  const list = data.projects;

  return (
    <Section id="projects">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">{tr("projects.title")}</h2>
        <p className="mt-2 text-white/70">{tr("projects.subtitle")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {list.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { tr } = useI18n();

  const host =
    (() => {
      try {
        return new URL(project.href).hostname.replace(/^www\./, "");
      } catch {
        return "";
      }
    })() || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group relative"
    >
      {/* glow-kant */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur
               transition duration-500
               group-hover:opacity-100
               [background:linear-gradient(120deg,rgba(0,209,178,.55),rgba(255,255,255,.08))]"
      />

      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className={clsx(
          "relative block rounded-2xl border border-white/10 bg-white/[0.06] p-4",
          "shadow-[--shadow-soft] transition duration-300 hover:bg-white/[0.08]",
        )}
      >
        {/* PREVIEW */}
        <SitePreview
          url={project.href}
          className="mb-4"
          alt={`${project.title} preview`}
        />

        {/* Tekster */}
        <div className="px-2 pb-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">
              {project.title}
            </h3>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white/60 group-hover:text-white transition"
              aria-hidden
            >
              <path
                fill="currentColor"
                d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"
              />
            </svg>
          </div>

          <p className="mt-2 text-sm text-white/75">{project.description}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[11px] text-white/80"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-4 text-xs text-white/50">
            {host || tr("projects.liveFallback")}
          </div>
        </div>
      </a>
    </motion.div>
  );
}
