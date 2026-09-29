import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { useExperience } from "@/hooks/useExperience";
import { ExperienceControls } from "@/components/theme/ExperienceControls";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const { colorTheme } = useExperience();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const brand = site.brandCaps;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-80 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pt-5"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto grid max-w-[1400px] grid-cols-[1fr_auto] items-center gap-2 rounded-full border border-hairline transition-all duration-700 ease-[var(--ease-premium)] lg:grid-cols-[1fr_auto_1fr]",
            scrolled || colorTheme === "light"
              ? "glass-strong px-2 py-1 shadow-soft sm:px-4 sm:py-2"
              : "bg-transparent px-2 py-1.5 sm:px-4 sm:py-3",
          )}
        >
          <Link
            to="/"
            className="justify-self-start pl-1 text-[0.7rem] font-medium tracking-[0.14em] text-foreground sm:text-sm"
          >
            {brand}
          </Link>

          <ul className="hidden items-center justify-center gap-0.5 lg:flex">
            {site.nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "text-foreground bg-foreground/8" }}
                  inactiveProps={{ className: "text-muted-foreground" }}
                  className="block rounded-full px-4 py-2 text-[0.8rem] transition-colors duration-300 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden justify-self-end lg:block">
            <ExperienceControls />
          </div>

          <div className="flex items-center justify-end gap-1.5 justify-self-end lg:hidden">
            <ExperienceControls compact />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="glass grid size-10 min-h-10 place-items-center rounded-full text-foreground sm:size-11 sm:min-h-11"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-90 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-background/40 backdrop-blur-[2px]"
            />
            <motion.div
              role="dialog"
              aria-label="Menu"
              initial={{ y: "8%", opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "6%", opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong absolute inset-x-3 bottom-3 top-20 flex flex-col rounded-[32px] p-6 shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm tracking-[0.14em]">{brand}</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-11 min-h-11 place-items-center rounded-full border border-hairline"
                >
                  <X className="size-4" />
                </button>
              </div>

              <ul className="mt-10 flex flex-col gap-1">
                {site.nav.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.05,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="display block border-b border-hairline py-4 text-4xl text-foreground"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3">
                <span className="label-xs text-muted-foreground">Atmosphere</span>
                <ExperienceControls />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
