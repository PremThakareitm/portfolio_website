export const site = {
  name: "Prem Thakare",
  brand: "Prem®",
  brandCaps: "PREM®",
  roles: ["Full-Stack Developer", "AI Automation", "Cloud & DevOps"],
  resume: "/resume/Prem-Thakare.pdf",
  githubUser: "PremThakareitm",
  hero: {
    eyebrow: "Full-Stack Developer · AI Automation",
    heading: ["I build digital experiences", "that move."],
    description:
      "Hands-on across AI automation, browser workflows, LLM integration, responsive web apps, REST APIs, and cloud delivery.",
    meta: ["FULL-STACK", "AI AUTOMATION", "CLOUD", "DEVOPS"],
    primaryCta: { label: "Explore Work", to: "/work" as const },
    secondaryCta: { label: "About Me", to: "/about" as const },
    availability: "Open to internships, freelance, and collaborations",
  },
  rooms: {
    heading: "Move through the work.",
    subheading:
      "Products, platforms, and experiments — each room is a different kind of work.",
  },
  about: {
    statement:
      "Full-Stack Developer with hands-on experience in AI automation, browser automation, LLM integration, and cloud-connected products.",
  },
  contact: {
    heading: "Have something worth building?",
    support: "Let's turn an idea into something useful.",
    email: "premthakare96680@gmail.com",
    phone: "+91 9156621088",
    linkedin: "https://linkedin.com/in/premthakare/",
    linkedinLabel: "linkedin.com/in/premthakare/",
    github: "https://github.com/PremThakareitm",
    githubLabel: "github.com/PremThakareitm",
    location: "Remote · India",
  },
  seo: {
    title: "Prem Thakare — Full-Stack Developer | AI Automation",
    description:
      "Portfolio of Prem Thakare — full-stack developer working across AI automation, LLM integration, cloud, and modern web applications.",
  },
  nav: [
    { label: "Home", to: "/" as const },
    { label: "Work", to: "/work" as const },
    { label: "About", to: "/about" as const },
    { label: "Lab", to: "/lab" as const },
    { label: "Contact", to: "/contact" as const },
  ],
};

export type Site = typeof site;
