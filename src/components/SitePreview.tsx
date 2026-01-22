"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function SitePreview({
  url,
  className,
  alt = "Website preview",
  allowLiveIframe = false,
  showHostBadge = true,
}: {
  url: string;
  className?: string;
  alt?: string;
  allowLiveIframe?: boolean;
  showHostBadge?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [img, setImg] = useState<string | null>(null);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let alive = true;
    (async () => {
      try {
        const r = await fetch(`/api/og?url=${encodeURIComponent(url)}`, {
          cache: "force-cache",
        });
        const { image } = await r.json();
        if (alive) setImg(image ?? null);
      } catch {
        if (alive) setImg(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, [inView, url]);

  const host =
    (() => {
      try {
        return new URL(url).hostname.replace(/^www\./, "");
      } catch {
        return "";
      }
    })() || "";

  return (
    <div
      ref={wrapRef}
      className={clsx(
        "relative overflow-hidden rounded-xl aspect-[16/9] border border-white/10 bg-white/5",
        className
      )}
    >
      {img && !showIframe ? (
        <Image
          src={img}
          alt={alt}
          fill
          sizes="(min-width: 768px) 45vw, 90vw"
          className="object-cover"
          priority={false}
          quality={70}
        />
      ) : showIframe && allowLiveIframe ? (
        <iframe
          title={alt}
          src={url}
          className="absolute inset-0 h-full w-full"
          sandbox="allow-same-origin allow-scripts allow-forms"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
      )}

      {showHostBadge && host && (
        <div className="absolute left-3 bottom-3 rounded-lg border border-white/10 bg-black/50 px-3 py-1 text-xs text-white/75 backdrop-blur">
          {host}
        </div>
      )}

      {allowLiveIframe && !showIframe && (
        <button
          onClick={() => setShowIframe(true)}
          className="absolute right-3 top-3 rounded-md border border-white/15 bg-black/50 px-2 py-1 text-xs text-white/80 backdrop-blur hover:bg-black/60"
        >
          Åbn live preview
        </button>
      )}
    </div>
  );
}
