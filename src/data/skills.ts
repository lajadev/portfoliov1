export type Lang = "da" | "en" | "de";

/**
 * 🔑 Alle skill-sektioner (bruges i scroll + UI)
 */
export type StepKey = "frontend" | "backend" | "other";

export type SkillItem = {
  name: string;
  level: number; // 0-100
};

export type SkillCategory = {
  key: StepKey;
  title: string;
  items: SkillItem[];
};

export type ScrollyCopy = {
  key: StepKey;
  title: string;
  text: string;
};

type SkillsByLang = {
  categories: SkillCategory[];
  scrolly: ScrollyCopy[];
};

export const skillsByLang: Record<Lang, SkillsByLang> = {
  /* =======================
     🇩🇰 DANSK
     ======================= */
  da: {
    categories: [
      {
        key: "frontend",
        title: "Frontend",
        items: [
          { name: "HTML", level: 90 },
          { name: "CSS", level: 90 },
          { name: "Tailwind CSS", level: 88 },
          { name: "JavaScript", level: 85 },
          { name: "TypeScript", level: 70 },
          { name: "React", level: 80 },
          { name: "Next.js", level: 75 },
        ],
      },
      {
        key: "backend",
        title: "Backend",
        items: [
          { name: "Node.js", level: 70 },
          { name: "Express", level: 65 },
          { name: "REST API", level: 70 },
          { name: "MongoDB", level: 60 },
          { name: "Supabase", level: 80 },
          { name: "MYSQL", level: 55 },
          { name: "Mailchimp - Email service", level: 55 },
          { name: "Authentication", level: 35 },
        ],
      },
      {
        key: "other",
        title: "Andre værktøjer",
        items: [
          { name: "Git / GitHub", level: 85 },
          { name: "Figma", level: 70 },
          { name: "Adobe Creative Cloud", level: 60 },
          { name: "SEO", level: 75 },
          { name: "Testing", level: 65 },
          { name: "Vercel", level: 75 },
          { name: "Netlify", level: 70 },
          { name: "ChatGPT", level: 70 },
        ],
      },
    ],
    scrolly: [
      {
        key: "frontend",
        title: "Frontend",
        text: "Jeg bygger tilgængelige, hurtige UI’er i React/Next.js med Tailwind. Jeg tænker i komponenter, tilstand og animationer.",
      },
      {
        key: "backend",
        title: "Backend",
        text: "Jeg udvikler simple og strukturerede backend-løsninger med Node.js og REST API’er, med fokus på data, auth og performance.",
      },
      {
        key: "other",
        title: "Andre værktøjer",
        text: "Git til samarbejde, Figma til design-handoff og SEO/performance som en fast del af min proces.",
      },
    ],
  },

  /* =======================
     🇬🇧 ENGLISH
     ======================= */
  en: {
    categories: [
      {
        key: "frontend",
        title: "Frontend",
        items: [
          { name: "HTML", level: 90 },
          { name: "CSS", level: 90 },
          { name: "Tailwind CSS", level: 88 },
          { name: "JavaScript", level: 85 },
          { name: "TypeScript", level: 70 },
          { name: "React", level: 80 },
          { name: "Next.js", level: 75 },
        ],
      },
      {
        key: "backend",
        title: "Backend",
        items: [
          { name: "Node.js", level: 70 },
          { name: "Express", level: 65 },
          { name: "REST API", level: 70 },
          { name: "MongoDB", level: 60 },
          { name: "Supabase", level: 80 },
          { name: "MYSQL", level: 55 },
          { name: "Mailchimp - Email service", level: 55 },
          { name: "Authentication", level: 35 },
        ],
      },
      {
        key: "other",
        title: "Other tools",
        items: [
          { name: "Git / GitHub", level: 85 },
          { name: "Figma", level: 70 },
          { name: "Adobe Creative Cloud", level: 60 },
          { name: "SEO", level: 75 },
          { name: "Testing", level: 65 },
          { name: "Vercel", level: 75 },
          { name: "Netlify", level: 70 },
          { name: "ChatGPT", level: 70 },
        ],
      },
    ],
    scrolly: [
      {
        key: "frontend",
        title: "Frontend",
        text: "I build accessible, fast UIs in React/Next.js with Tailwind. I think in components, state and animations.",
      },
      {
        key: "backend",
        title: "Backend",
        text: "I build simple and structured backend solutions using Node.js and REST APIs, focusing on data, authentication and performance.",
      },
      {
        key: "other",
        title: "Other tools",
        text: "Git for collaboration, Figma for design handoff, and SEO/performance as a natural part of my process.",
      },
    ],
  },

  /* =======================
     🇩🇪 DEUTSCH
     ======================= */
  de: {
    categories: [
      {
        key: "frontend",
        title: "Frontend",
        items: [
          { name: "HTML", level: 90 },
          { name: "CSS", level: 90 },
          { name: "Tailwind CSS", level: 88 },
          { name: "JavaScript", level: 85 },
          { name: "TypeScript", level: 70 },
          { name: "React", level: 80 },
          { name: "Next.js", level: 75 },
        ],
      },
      {
        key: "backend",
        title: "Backend",
        items: [
          { name: "Node.js", level: 70 },
          { name: "Express", level: 65 },
          { name: "REST API", level: 70 },
          { name: "MongoDB", level: 60 },
          { name: "Supabase", level: 80 },
          { name: "MYSQL", level: 55 },
          { name: "Mailchimp - Email service", level: 55 },
          { name: "Authentication", level: 35 },
        ],
      },
      {
        key: "other",
        title: "Weitere Tools",
        items: [
          { name: "Git / GitHub", level: 85 },
          { name: "Figma", level: 70 },
          { name: "Adobe Creative Cloud", level: 60 },
          { name: "SEO", level: 75 },
          { name: "Testing", level: 65 },
          { name: "Vercel", level: 75 },
          { name: "Netlify", level: 70 },
          { name: "ChatGPT", level: 70 },
        ],
      },
    ],
    scrolly: [
      {
        key: "frontend",
        title: "Frontend",
        text: "Ich entwickle zugängliche, schnelle UIs in React/Next.js mit Tailwind. Ich denke in Komponenten, State und Animationen.",
      },
      {
        key: "backend",
        title: "Backend",
        text: "Ich entwickle einfache und strukturierte Backend-Lösungen mit Node.js und REST-APIs, mit Fokus auf Daten, Authentifizierung und Performance.",
      },
      {
        key: "other",
        title: "Weitere Tools",
        text: "Git für Zusammenarbeit, Figma für Design-Handoff und SEO/Performance als fester Bestandteil meines Prozesses.",
      },
    ],
  },
};
