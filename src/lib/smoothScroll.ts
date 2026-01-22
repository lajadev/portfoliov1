// Smooth, ScrollTrigger-friendly anchor scrolling
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let registered = false;
function ensure() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
    registered = true;
  }
}

/** Smooth-scroll to an element id, accounting for a sticky header offset. */
export function smoothScrollTo(idOrHash: string, offsetY = 96, duration = 0.6) {
  if (typeof window === "undefined") return;
  ensure();

  const id = idOrHash.replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.pageYOffset - offsetY;

  gsap.to(window, {
    scrollTo: { y, autoKill: true },
    duration,
    ease: "power2.out",
  });

  // optional: update URL hash without causing jump
  history.replaceState(null, "", `#${id}`);
}
