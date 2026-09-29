import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Subtle glass cursor. Pointer-fine devices only. */
export function GlassCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 320, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 320, damping: 30, mass: 0.4 });

  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest("a,button,[data-cursor-target]")));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-90 -translate-x-1/2 -translate-y-1/2 will-change-transform"
    >
      <motion.span
        animate={{ scale: active ? 1.9 : 1, opacity: active ? 0.9 : 0.55 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="block size-4 rounded-full border border-foreground/30 bg-foreground/5 backdrop-blur-[2px]"
      />
    </motion.div>
  );
}
