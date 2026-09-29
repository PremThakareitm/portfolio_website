import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteNav } from "@/components/navigation/SiteNav";
import { Reveal } from "@/components/motion/Reveal";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { ResumePreview } from "@/components/system/ResumePreview";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: site.seo.title },
      { name: "description", content: site.seo.description },
      { property: "og:title", content: site.seo.title },
      { property: "og:description", content: site.seo.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const ease = [0.22, 1, 0.36, 1] as const;

const rooms = [
  {
    label: "Work",
    to: "/work" as const,
    category: "Products & systems",
    copy: "CampusPe, freelance sites, and full-stack platforms shipped for teams and businesses.",
    items: ["CampusPe", "MICEKart", "Shivai Masale", "Nakoda Overseas", "Livspace Clone", "GrabOn"],
    tone: "blue",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    label: "AI / Automation",
    to: "/work" as const,
    category: "Applied intelligence",
    copy: "Playwright Auto-Apply, Ollama, OpenAI, and Claude inside real product workflows.",
    tone: "slate",
    span: "lg:col-span-2",
  },
  {
    label: "Cloud",
    to: "/about" as const,
    category: "AWS · Azure · CI/CD",
    copy: "Production deploys, GitHub Actions, and hosting across AWS and Azure.",
    tone: "green",
    span: "lg:col-span-1",
  },
  {
    label: "Engineering",
    to: "/about" as const,
    category: "Full stack",
    copy: "React, Node, Express, MongoDB — from interface to API to database.",
    tone: "clay",
    span: "lg:col-span-1",
  },
  {
    label: "Lab",
    to: "/lab" as const,
    category: "Experiments",
    copy: "Prototypes in automation, local LLMs, and interface motion.",
    tone: "amber",
    span: "lg:col-span-2",
  },
  {
    label: "About",
    to: "/about" as const,
    category: "Background",
    copy: "Experience, education, certifications, and how I work.",
    tone: "warm",
    span: "lg:col-span-1",
  },
  {
    label: "Contact",
    to: "/contact" as const,
    category: "Say hello",
    copy: "Open to internships, freelance, and collaborations.",
    tone: "slate",
    span: "lg:col-span-1",
  },
];

function Home() {
  return (
    <div className="relative min-h-screen">
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <FeaturedProject />
        <Rooms />
        <SkillsPreview />
        <ContactStrip />
      </main>
      <footer className="border-t border-hairline px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3">
          <span className="label-xs text-muted-foreground">{site.brandCaps}</span>
          <span className="label-xs text-muted-foreground">
            {site.roles.join(" · ")}
          </span>
        </div>
      </footer>
    </div>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const step = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
            delay: 0.18 + i * 0.08,
            ease,
          },
        };

  return (
    <section className="relative flex min-h-[100svh] items-center px-4 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.p {...step(0)} className="label-xs text-muted-foreground">
          {site.hero.eyebrow}
        </motion.p>

        <motion.h1
          {...step(1)}
          className="display mt-6 max-w-[18ch] text-balance leading-[0.95] text-foreground"
          style={{ fontSize: "clamp(2.15rem, 9vw, 6.5rem)" }}
        >
          {site.hero.heading[0]}
          <br />
          <span className="italic opacity-90">{site.hero.heading[1]}</span>
        </motion.h1>

        <motion.p
          {...step(2)}
          className="mt-7 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground"
        >
          {site.hero.description}
        </motion.p>

        <motion.div {...step(3)} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            to={site.hero.primaryCta.to}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform duration-500 ease-[var(--ease-premium)] hover:scale-[1.02]"
          >
            {site.hero.primaryCta.label}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            to={site.hero.secondaryCta.to}
            className="glass inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm text-foreground transition-transform duration-500 ease-[var(--ease-premium)] hover:scale-[1.02]"
          >
            {site.hero.secondaryCta.label}
          </Link>
        </motion.div>

        <motion.div
          {...step(4)}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          {site.hero.meta.map((m) => (
            <span key={m} className="label-xs text-muted-foreground">
              {m}
            </span>
          ))}
          <span className="label-xs flex items-center gap-2 text-foreground">
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-primary motion-safe:animate-pulse"
            />
            {site.hero.availability}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedProject() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  if (!featured) return null;

  return (
    <section className="px-4 py-16 sm:px-8 sm:py-28">
      <Reveal className="mx-auto max-w-[1400px]">
        <Link
          to="/work/$slug"
          params={{ slug: featured.slug }}
          className="group card-surface block overflow-hidden rounded-[36px] transition-all duration-700 ease-[var(--ease-premium)] hover:scale-[1.008] hover:shadow-lift"
        >
          <div className="grid lg:grid-cols-[1.05fr_1fr]">
            <div className="flex flex-col justify-between gap-8 border-b border-hairline p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <p className="label-xs text-muted-foreground">Featured</p>
              <ul className="grid gap-0 sm:grid-cols-2">
                {(featured.stats ?? []).map((stat, i) => (
                  <motion.li
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="border-t border-hairline py-5 pr-4"
                  >
                    <p className="display text-3xl text-foreground sm:text-4xl">{stat.value}</p>
                    <p className="mt-1.5 text-[0.75rem] leading-snug text-muted-foreground">
                      {stat.label}
                    </p>
                  </motion.li>
                ))}
              </ul>
              <p className="label-xs text-muted-foreground">{featured.category}</p>
            </div>
            <div className="flex flex-col justify-between gap-8 p-7 sm:p-10">
              <div>
                <p className="label-xs text-muted-foreground">
                  {featured.role}
                  {featured.year ? ` · ${featured.year}` : ""}
                </p>
                <h2 className="display mt-4 text-4xl text-foreground sm:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {featured.description}
                </p>
              </div>
              <div>
                <ul className="flex flex-wrap gap-2">
                  {featured.technologies.slice(0, 6).map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-hairline px-3 py-1 text-[0.7rem] text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-7 inline-flex items-center gap-2 text-sm text-foreground">
                  Open room
                  <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}

function Rooms() {
  return (
    <section className="px-4 pb-16 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="display max-w-2xl text-3xl text-foreground sm:text-5xl">
            {site.rooms.heading}
          </h2>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">
            {site.rooms.subheading}
          </p>
        </Reveal>

        <ul className="mt-12 grid auto-rows-[minmax(180px,auto)] gap-4 sm:gap-5 lg:grid-cols-4">
          {rooms.map((room, i) => (
            <Reveal as="li" key={room.label} delay={i * 0.05} className={cn(room.span)}>
              <Link
                to={room.to}
                className="group card-surface relative flex size-full flex-col justify-between overflow-hidden rounded-[24px] p-5 transition-all duration-500 ease-[var(--ease-premium)] hover:scale-[1.012] hover:shadow-lift sm:p-6"
              >
                <MediaPlaceholder
                  kind="gradient"
                  tone={room.tone}
                  animated={false}
                  className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16] transition-opacity duration-700 group-hover:opacity-25"
                />
                <div>
                  <p className="label-xs text-muted-foreground">{room.category}</p>
                  <h3 className="display mt-3 text-2xl text-foreground sm:text-3xl">
                    {room.label}
                  </h3>
                </div>
                {"items" in room && room.items ? (
                  <ul className="my-6 flex flex-1 flex-col justify-center gap-2">
                    {room.items.map((item) => (
                      <li
                        key={item}
                        className="border-t border-hairline pt-2 text-sm text-foreground/85"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex-1" />
                )}
                <div className="mt-2 flex items-end justify-between gap-4">
                  <p className="max-w-[26ch] text-xs leading-relaxed text-muted-foreground">
                    {room.copy}
                  </p>
                  <ArrowUpRight className="size-4 shrink-0 text-foreground transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SkillsPreview() {
  return (
    <section className="px-4 pb-16 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="label-xs text-muted-foreground">Toolkit</p>
          <h2 className="display mt-4 text-3xl text-foreground sm:text-4xl">
            Systems I work with.
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal
              as="li"
              key={group.label}
              delay={i * 0.04}
              className="glass rounded-[24px] p-6"
            >
              <p className="label-xs text-muted-foreground">{group.label}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-hairline px-3 py-1 text-[0.72rem] text-foreground/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <section className="px-4 pb-24 sm:px-8">
      <Reveal className="mx-auto max-w-[1400px]">
        <div className="card-surface flex flex-col gap-8 rounded-[36px] p-8 sm:p-14">
          <h2 className="display max-w-[20ch] text-3xl text-foreground sm:text-5xl">
            {site.contact.heading}
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            {site.contact.support}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background"
            >
              Contact
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={`mailto:${site.contact.email}`}
              className="glass inline-flex min-h-11 items-center rounded-full px-6 text-sm text-foreground"
            >
              {site.contact.email}
            </a>
            <ResumePreview />
            <a
              href={site.resume}
              download
              className="glass inline-flex min-h-11 items-center rounded-full px-6 text-sm text-foreground"
            >
              Download resume
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
