"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SkillBar({
  label,
  level,
}: {
  label: string;
  level: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  return (
    <div className="space-y-1.5">
      <div className="text-xs text-white/70">{label}</div>
      <div ref={ref} className="h-2 rounded-full bg-white/10">
        <motion.div
          className="h-2 rounded-full bg-white/80"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          aria-label={`${label} ${level}%`}
        />
      </div>
    </div>
  );
}
