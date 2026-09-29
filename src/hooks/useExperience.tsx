import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { playUiSound, startAmbient, stopAmbient } from "@/lib/audio-engine";

export type VisualMode = "cinematic";
export type ColorTheme = "light" | "dark";
export type TextScale = "default" | "large";

type Ctx = {
  visualMode: VisualMode;
  colorTheme: ColorTheme;
  soundOn: boolean;
  textScale: TextScale;
  mounted: boolean;
  setColorTheme: (t: ColorTheme) => void;
  toggleSound: () => void;
  toggleTextScale: () => void;
  play: (name: "click" | "transition") => void;
};

const KEYS = {
  theme: "prem.color-theme",
  sound: "prem.sound",
  text: "prem.text-scale",
};

const ExperienceContext = createContext<Ctx | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const visualMode: VisualMode = "cinematic";
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("dark");
  const [soundOn, setSoundOn] = useState(false);
  const [textScale, setTextScale] = useState<TextScale>("default");
  const [mounted, setMounted] = useState(false);

  // Restore persisted preferences on the client only.
  useEffect(() => {
    try {
      const t = localStorage.getItem(KEYS.theme);
      const s = localStorage.getItem(KEYS.sound);
      const x = localStorage.getItem(KEYS.text);
      if (t === "light" || t === "dark") setColorThemeState(t);
      if (s === "on") setSoundOn(true);
      if (x === "large") setTextScale("large");
      localStorage.removeItem("prem.visual-mode");
    } catch {
      /* storage unavailable — keep defaults */
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset["mode"] = visualMode;
    root.dataset["text"] = textScale;
    root.classList.toggle("dark", colorTheme === "dark");
    root.style.colorScheme = colorTheme;
  }, [visualMode, colorTheme, textScale]);

  const setColorTheme = useCallback((t: ColorTheme) => {
    setColorThemeState(t);
    try {
      localStorage.setItem(KEYS.theme, t);
    } catch {
      /* ignore */
    }
  }, []);

  const play = useCallback(
    (name: "click" | "transition") => {
      if (!soundOn) return;
      playUiSound(name);
    },
    [soundOn],
  );

  const toggleTextScale = useCallback(() => {
    setTextScale((prev) => {
      const next: TextScale = prev === "large" ? "default" : "large";
      try {
        localStorage.setItem(KEYS.text, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(KEYS.sound, next ? "on" : "off");
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  // Background score follows the speaker toggle. Never autoplays without consent.
  useEffect(() => {
    if (!soundOn) {
      stopAmbient();
      return;
    }
    startAmbient();
  }, [soundOn]);

  const value = useMemo<Ctx>(
    () => ({
      visualMode,
      colorTheme,
      soundOn,
      textScale,
      mounted,
      setColorTheme,
      toggleSound,
      toggleTextScale,
      play,
    }),
    [
      visualMode,
      colorTheme,
      soundOn,
      textScale,
      mounted,
      setColorTheme,
      toggleSound,
      toggleTextScale,
      play,
    ],
  );

  return (
    <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
  );
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error("useExperience must be used inside ExperienceProvider");
  return ctx;
}

export function useVisualMode() {
  const { visualMode } = useExperience();
  return { visualMode, isCinematic: true as const };
}

export function useTheme() {
  const { colorTheme, setColorTheme } = useExperience();
  return { colorTheme, setColorTheme };
}

export function useAudio() {
  const { soundOn, toggleSound, play } = useExperience();
  return { soundOn, toggleSound, play };
}
