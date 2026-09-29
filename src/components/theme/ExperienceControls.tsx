import { Sun, Moon, Volume2, VolumeX, Type } from "lucide-react";
import { useExperience } from "@/hooks/useExperience";
import { cn } from "@/lib/utils";

function Segmented({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass flex items-center gap-0.5 rounded-full p-0.5 shadow-soft",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Seg({
  active,
  label,
  onClick,
  icon,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={cn(
        "flex min-h-10 items-center justify-center rounded-full px-2.5 text-[0.72rem] font-medium tracking-wide transition-all duration-500 ease-[var(--ease-premium)] sm:min-h-11 sm:px-3",
        active
          ? "bg-foreground/90 text-background shadow-soft"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      <span className="grid size-4 place-items-center">{icon}</span>
    </button>
  );
}

export function ExperienceControls({
  compact = false,
}: {
  compact?: boolean;
}) {
  const {
    colorTheme,
    soundOn,
    textScale,
    setColorTheme,
    toggleSound,
    toggleTextScale,
    play,
  } = useExperience();

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Segmented>
        <Seg
          active={colorTheme === "light"}
          label="Light theme"
          icon={<Sun className="size-3.5" />}
          onClick={() => {
            setColorTheme("light");
            play("click");
          }}
        />
        <Seg
          active={colorTheme === "dark"}
          label="Dark theme"
          icon={<Moon className="size-3.5" />}
          onClick={() => {
            setColorTheme("dark");
            play("click");
          }}
        />
      </Segmented>

      {compact ? null : (
        <button
          type="button"
          onClick={() => {
            toggleTextScale();
            play("click");
          }}
          aria-pressed={textScale === "large"}
          aria-label={textScale === "large" ? "Use default text size" : "Use larger text"}
          className="glass grid size-10 min-h-10 place-items-center rounded-full text-muted-foreground shadow-soft transition-colors hover:text-foreground sm:size-11 sm:min-h-11"
        >
          <Type className="size-4" />
        </button>
      )}

      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={soundOn}
        aria-label={soundOn ? "Turn background music off" : "Turn background music on"}
        className="glass grid size-10 min-h-10 place-items-center rounded-full text-muted-foreground shadow-soft transition-colors hover:text-foreground sm:size-11 sm:min-h-11"
      >
        {soundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
      </button>
    </div>
  );
}
