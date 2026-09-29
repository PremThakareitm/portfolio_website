import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouterState } from "@tanstack/react-router";
import { useExperience } from "@/hooks/useExperience";
import { media, sceneFromPath } from "@/config/media";

/**
 * Fullscreen environment behind the interface.
 * Home keeps the cinematic video; every other room uses a still
 * matched to that page's subject.
 */
export function CinematicBackground() {
  const { colorTheme } = useExperience();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const scene = sceneFromPath(pathname);
  const [videoFailed, setVideoFailed] = useState(false);
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 768px)").matches;
    const slow = (navigator as { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    setLowPower(Boolean(reduce || small || slow));
  }, []);

  const homeEnv = colorTheme === "dark" ? media.cinematic.dark : media.cinematic.light;
  const still = media.scenes[scene][colorTheme];
  const showHomeVideo =
    scene === "home" && Boolean(homeEnv.video) && !videoFailed && !lowPower;
  const poster = scene === "home" ? homeEnv.poster : still;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-background">
      <AnimatePresence mode="sync">
        {showHomeVideo ? (
          <motion.video
            key={homeEnv.video as string}
            className="absolute inset-0 size-full object-cover"
            src={homeEnv.video as string}
            poster={homeEnv.poster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onError={() => setVideoFailed(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : (
          <motion.img
            key={`${scene}-${colorTheme}-${poster}`}
            src={poster}
            alt=""
            className="absolute inset-0 size-full object-cover"
            width={1920}
            height={1088}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
      <div
        className={
          colorTheme === "dark"
            ? "absolute inset-0 bg-linear-to-b from-[#07111C]/60 via-[#0B1724]/40 to-[#07111C]/78"
            : scene === "home"
              ? "absolute inset-0 bg-linear-to-b from-[#EDE4D4]/58 via-[#EDE4D4]/42 to-[#D8CCB8]/72"
              : "absolute inset-0 bg-linear-to-b from-[#F6F0E6]/92 via-[#F3EBDD]/90 to-[#E8DCC8]/94"
        }
      />
      <div className="grain absolute inset-0" />
    </div>
  );
}
