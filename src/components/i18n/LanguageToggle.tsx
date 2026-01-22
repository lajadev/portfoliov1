"use client";

import { useI18n } from "@/components/i18n/LanguageProvider";

const options = [
  { code: "da", label: "DA" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
] as const;

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/5 p-1">
      {options.map((o) => (
        <button
          key={o.code}
          onClick={() => setLang(o.code)}
          className={`px-2 py-1 text-xs rounded ${
            lang === o.code
              ? "bg-white/15 text-white"
              : "text-white/70 hover:bg-white/10"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
