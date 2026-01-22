// src/lib/scrolly.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface PinScrollerConfig {
  /** The whole section element you want to pin */
  container: HTMLElement;
  /** The right-hand scrollable content whose scrollTop GSAP will drive */
  scroller: HTMLElement;
  /** Panels inside scroller, in order */
  panels: HTMLElement[];
  /** Called when the nearest panel to center changes */
  onStep?: (index: number) => void;
}

export interface PinScrollerInstance {
  kill(): void;
  refresh(): void;
}

/**
 * Pins the section and maps page scroll to the internal scroller's scrollTop.
 * Snaps to each panel and reports active index via onStep.
 */
export function createPinnedScroller(
  cfg: PinScrollerConfig
): PinScrollerInstance {
  const { container, scroller, panels, onStep } = cfg;

  // Compute normalized snap positions [0..1] for each panel
  const computeSnaps = () => {
    const max = Math.max(1, scroller.scrollHeight - scroller.clientHeight);
    return panels.map((p) => {
      const target = p.offsetTop - (scroller.clientHeight - p.clientHeight) / 2;
      const clamped = Math.min(max, Math.max(0, target));
      return clamped / max;
    });
  };

  let snaps = computeSnaps();

  // Use function-form snap to avoid TS definitions that don't include the object variant
  const snapFn = (value: number) => {
    let nearest = snaps[0] ?? 0;
    let min = Infinity;
    for (const s of snaps) {
      const d = Math.abs(s - value);
      if (d < min) {
        min = d;
        nearest = s;
      }
    }
    return nearest;
  };

  const st = ScrollTrigger.create({
    trigger: container,
    start: "top top",
    end: () => {
      const max = scroller.scrollHeight - scroller.clientHeight;
      return "+=" + (max || 1);
    },
    scrub: 1, // smooth scrubbing
    pin: true,
    snap: snapFn, // snapping between panels
    onUpdate(self) {
      const max = scroller.scrollHeight - scroller.clientHeight;
      scroller.scrollTop = self.progress * max;

      // pick the panel closest to center
      const center = scroller.scrollTop + scroller.clientHeight / 2;
      let idx = 0;
      let best = Infinity;
      panels.forEach((p, i) => {
        const mid = p.offsetTop + p.clientHeight / 2;
        const d = Math.abs(mid - center);
        if (d < best) {
          best = d;
          idx = i;
        }
      });
      onStep?.(idx);
    },
    onRefresh() {
      snaps = computeSnaps();
    },
  });

  // Keep sizes in sync — safe refresh (no recursion)
  const ro = new ResizeObserver(() => ScrollTrigger.refresh());
  ro.observe(scroller);
  panels.forEach((p) => ro.observe(p));
  // ensure an initial refresh after layout settles
  setTimeout(() => ScrollTrigger.refresh(), 0);

  return {
    kill() {
      ro.disconnect();
      st.kill();
    },
    refresh() {
      snaps = computeSnaps();
      ScrollTrigger.refresh();
    },
  };
}
