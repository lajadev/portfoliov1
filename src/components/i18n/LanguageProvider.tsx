"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { translations, type Dictionary, type Language } from "@/data/i18n";

type Ctx = {
  lang: Language;
  setLang: (l: Language) => void;
  t: Dictionary;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "portfolio_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("da");

  useEffect(() => {
    const saved =
      (localStorage.getItem(STORAGE_KEY) as Language | null) ?? null;
    if (saved && saved in translations) setLangState(saved);
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang =
      l === "da" ? "da" : l === "de" ? "de" : "en";
  };

  const value = useMemo(
    () => ({ lang, setLang, t: translations[lang] }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used inside <LanguageProvider />");

  // tr("about.cards.technical.title") -> string
  const tr = (path: string) => {
    const parts = path.split(".");
    let current: any = ctx.t;

    for (const p of parts) {
      current = current?.[p];
      if (current === undefined) return path; // fallback hvis key mangler
    }
    return current as any;
  };

  return { ...ctx, tr };
}
