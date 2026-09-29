import { useState } from "react";
import { cn } from "@/lib/utils";

type Tone = "blue" | "slate" | "warm" | "green" | "clay" | "amber";

const tones: Record<Tone, string> = {
  blue: "from-[oklch(0.55_0.12_250)] via-[oklch(0.35_0.08_255)] to-[oklch(0.25_0.05_260)]",
  slate:
    "from-[oklch(0.62_0.03_240)] via-[oklch(0.42_0.02_245)] to-[oklch(0.28_0.02_250)]",
  warm: "from-[oklch(0.72_0.08_60)] via-[oklch(0.52_0.07_45)] to-[oklch(0.32_0.05_40)]",
  green: "from-[oklch(0.66_0.08_150)] via-[oklch(0.44_0.06_155)] to-[oklch(0.28_0.04_160)]",
  clay: "from-[oklch(0.68_0.07_30)] via-[oklch(0.46_0.06_25)] to-[oklch(0.3_0.04_20)]",
  amber: "from-[oklch(0.76_0.1_75)] via-[oklch(0.55_0.09_60)] to-[oklch(0.32_0.05_50)]",
};

export type MediaPlaceholderProps = {
  kind?: "image" | "video" | "gradient";
  src?: string | null;
  poster?: string;
  alt?: string;
  tone?: string;
  label?: string;
  className?: string;
  animated?: boolean;
};

/**
 * Single media surface used everywhere. Falls back gracefully:
 * video -> poster -> abstract gradient texture. Layout never changes.
 */
export function MediaPlaceholder({
  kind = "gradient",
  src,
  poster,
  alt = "",
  tone = "slate",
  label,
  className,
  animated = true,
}: MediaPlaceholderProps) {
  const [failed, setFailed] = useState(false);
  const toneClass = tones[(tone as Tone) in tones ? (tone as Tone) : "slate"];
  const resolved = failed || !src ? (poster ? "image" : "gradient") : kind;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-muted",
        "after:pointer-events-none after:absolute after:inset-0 after:bg-linear-to-t after:from-black/25 after:to-transparent",
        className,
      )}
    >
      {resolved === "video" && src ? (
        <video
          className="size-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={alt || undefined}
          onError={() => setFailed(true)}
        />
      ) : resolved === "image" && (poster || src) ? (
        <img
          src={(poster ?? src) as string}
          alt={alt}
          loading="lazy"
          className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-premium)] group-hover:scale-[1.04]"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className={cn(
            "size-full bg-linear-to-br",
            toneClass,
            animated && "motion-safe:animate-[pulse_9s_ease-in-out_infinite]",
          )}
        >
          <div className="size-full bg-[radial-gradient(120%_90%_at_20%_10%,rgba(255,255,255,0.28),transparent_60%)]" />
        </div>
      )}
      {label ? (
        <span className="label-xs absolute bottom-3 left-4 z-10 text-white/70">
          {label}
        </span>
      ) : null}
    </div>
  );
}
