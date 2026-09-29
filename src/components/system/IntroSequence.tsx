import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";

const steps = ["01 MEDIA", "02 WORK", "03 SYSTEM"];
const SESSION_KEY = "prem.intro-seen";

/** Very short premium intro. Skipped on repeat visits and with reduced motion. */
export function IntroSequence() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduce) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen) return;
    setVisible(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setVisible(false), 1250);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-200 flex flex-col justify-between bg-background p-6 sm:p-10"
        >
          <span className="text-sm tracking-[0.2em]">{site.brandCaps}</span>
          <span className="display text-3xl sm:text-5xl">Loading experience</span>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {steps.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0.15 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.22, duration: 0.35 }}
                className="label-xs text-muted-foreground"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
