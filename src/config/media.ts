import cinematicDark from "@/assets/cinematic-dark.jpg";
import cinematicLight from "@/assets/cinematic-light.jpg";
import sceneWork from "@/assets/scene-work.jpg";
import sceneAbout from "@/assets/scene-about.jpg";
import sceneLab from "@/assets/scene-lab.jpg";
import sceneContact from "@/assets/scene-contact.jpg";
import featuredCampuspe from "@/assets/featured-campuspe.jpg";
import projectMicekart from "@/assets/project-micekart.jpg";
import projectShivai from "@/assets/project-shivai.jpg";
import projectNakoda from "@/assets/project-nakoda.jpg";
import projectLivspace from "@/assets/project-livspace.jpg";
import projectGrabon from "@/assets/project-grabon.jpg";

export type SceneKey = "home" | "work" | "about" | "lab" | "contact";

/**
 * Centralized media configuration. Never hard-code media URLs in components.
 * Drop real files into public/video, public/images and public/audio and point
 * these entries at them — layouts will not change.
 */
export const media = {
  cinematic: {
    dark: {
      video:
        "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
      poster: cinematicDark,
    },
    light: {
      video: null as string | null,
      poster: cinematicLight,
    },
  },
  scenes: {
    home: { dark: cinematicDark, light: cinematicLight },
    work: { dark: sceneWork, light: cinematicLight },
    about: { dark: sceneAbout, light: cinematicLight },
    lab: { dark: sceneLab, light: cinematicLight },
    contact: { dark: sceneContact, light: cinematicLight },
  },
  stills: {
    campuspe: featuredCampuspe,
    micekart: projectMicekart,
    "shivai-masale": projectShivai,
    "nakoda-overseas": projectNakoda,
    "livspace-clone": projectLivspace,
    grabon: projectGrabon,
  },
  video: {
    hero: "/video/hero.mp4",
    campuspe: "/video/campuspe.mp4",
    automation: "/video/automation.mp4",
    ai: "/video/ai.mp4",
    lab: "/video/lab.mp4",
  },
  audio: {
    ambient: "/audio/interstellar_stay.mp3",
    click: "/audio/ui-click.mp3",
    transition: "/audio/transition.mp3",
  },
};

export function sceneFromPath(pathname: string): SceneKey {
  if (pathname.startsWith("/work")) return "work";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/lab")) return "lab";
  if (pathname.startsWith("/contact")) return "contact";
  return "home";
}
