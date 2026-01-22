import { NextResponse } from "next/server";

function resolveUrl(src: string, base: string) {
  try {
    return new URL(src, base).toString();
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url) return NextResponse.json({ image: null }, { status: 400 });

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      cache: "no-store",
    });
    const html = await res.text();

    // meget enkel parsing – tjekker både og:image og twitter:image
    const metaRegex =
      /<meta\s+(?:property|name)=["'](?:og:image|twitter:image)["']\s+content=["']([^"']+)["'][^>]*>/i;
    const m = html.match(metaRegex);
    const raw = m?.[1];
    const image = raw ? resolveUrl(raw, url) : null;

    return NextResponse.json({ image });
  } catch {
    return NextResponse.json({ image: null }, { status: 200 });
  }
}
