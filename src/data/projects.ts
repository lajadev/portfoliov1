export type Lang = "da" | "en" | "de";

export type Project = {
  slug: string; // stabil id
  title: string;
  href: string;
  description: string;
  tags: string[];
};

type ProjectsByLang = {
  projects: Project[];
};

export const projectsByLang: Record<Lang, ProjectsByLang> = {
  da: {
    projects: [
      {
        slug: "funproject",
        title: "FunProject (SEO fokus)",
        href: "https://funproject-blue.vercel.app",
        description: "Side med fokus på SEO og forståelse af forbedringer.",
        tags: ["Next.js", "SEO", "Best Practices"],
      },
      {
        slug: "plasticchange",
        title: "PlasticChange – scrollytelling",
        href: "https://plasticchange-semester.netlify.app",
        description: "Semesterprojekt med scrollytelling og animationer.",
        tags: ["GSAP/Scroll", "Animation", "Storytelling"],
      },
      {
        slug: "first-portfolio",
        title: "Første portfolio",
        href: "https://lajadev.com",
        description:
          "Et af mine første projekter før jeg startede på min uddannelse. Fokus på React, API, gadgets og hosting på eget domæne.",
        tags: ["React", "API", "Hosting"],
      },
    ],
  },

  en: {
    projects: [
      {
        slug: "funproject",
        title: "FunProject (SEO focus)",
        href: "https://funproject-blue.vercel.app",
        description: "A site focused on SEO and understanding improvements.",
        tags: ["Next.js", "SEO", "Best Practices"],
      },
      {
        slug: "plasticchange",
        title: "PlasticChange – scrollytelling",
        href: "https://plasticchange-semester.netlify.app",
        description: "Semester project with scrollytelling and animations.",
        tags: ["GSAP/Scroll", "Animation", "Storytelling"],
      },
      {
        slug: "first-portfolio",
        title: "First portfolio",
        href: "https://lajadev.com",
        description:
          "One of my first projects before starting my education. Focused on React, APIs, gadgets and hosting on my own domain.",
        tags: ["React", "API", "Hosting"],
      },
    ],
  },

  de: {
    projects: [
      {
        slug: "funproject",
        title: "FunProject (SEO-Fokus)",
        href: "https://funproject-blue.vercel.app",
        description:
          "Eine Seite mit Fokus auf SEO und das Verständnis von Optimierungen.",
        tags: ["Next.js", "SEO", "Best Practices"],
      },
      {
        slug: "plasticchange",
        title: "PlasticChange – Scrollytelling",
        href: "https://plasticchange-semester.netlify.app",
        description: "Semesterprojekt mit Scrollytelling und Animationen.",
        tags: ["GSAP/Scroll", "Animation", "Storytelling"],
      },
      {
        slug: "first-portfolio",
        title: "Erstes Portfolio",
        href: "https://lajadev.com",
        description:
          "Eines meiner ersten Projekte vor Beginn meiner Ausbildung. Fokus auf React, APIs, Gadgets und Hosting auf eigener Domain.",
        tags: ["React", "API", "Hosting"],
      },
    ],
  },
};
