import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageFrame } from "@/components/layout/PageFrame";
import { Reveal } from "@/components/motion/Reveal";
import {
  certifications,
  education,
  experience,
  interests,
  languages,
} from "@/data/experience";
import { skills } from "@/data/skills";
import { ResumePreview } from "@/components/system/ResumePreview";
import { GithubStrip } from "@/components/system/GithubStrip";
import { site } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${site.name}` },
      {
        name: "description",
        content:
          "Prem Thakare — Full-Stack Developer working across AI automation, cloud, and LLM-powered products. Experience, education, and toolkit.",
      },
      { property: "og:title", content: `About — ${site.name}` },
      {
        property: "og:description",
        content: "Experience, education, and the tools behind the work.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageFrame>
      <main className="mx-auto max-w-[1100px] px-4 pb-24 pt-28 sm:px-8 sm:pt-40">
        <Reveal>
          <p className="label-xs text-muted-foreground">About</p>
          <h1 className="display mt-4 max-w-3xl text-3xl leading-tight text-foreground sm:text-5xl">
            {site.about.statement}
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Proficient in React.js, Node.js, Express.js, MongoDB, JavaScript, Playwright,
            Ollama, AWS, Microsoft Azure, and GitHub Actions. Currently building at
            CampusPe while finishing B.Tech CSE at ITM Skills University (9.3 CGPA).
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ResumePreview />
            <a
              href={site.resume}
              download
              className="glass inline-flex min-h-11 items-center gap-2 rounded-full px-6 text-sm text-foreground"
            >
              Download resume
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>

        <section className="mt-16">
          <h2 className="label-xs text-muted-foreground">GitHub</h2>
          <div className="mt-6">
            <GithubStrip />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="label-xs text-muted-foreground">Experience</h2>
          <ul className="mt-6 flex flex-col">
            {experience.map((item, i) => (
              <Reveal as="li" key={item.org} delay={i * 0.06} className="border-t border-hairline py-7">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-lg text-foreground">{item.role}</h3>
                  <span className="label-xs text-muted-foreground">{item.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.org} · {item.location}
                </p>
                {item.detail ? (
                  <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{item.detail}</p>
                ) : null}
                {item.highlights?.length ? (
                  <ul className="mt-4 max-w-2xl space-y-2">
                    {item.highlights.map((line) => (
                      <li
                        key={line}
                        className="text-sm leading-relaxed text-muted-foreground before:mr-3 before:text-foreground/40 before:content-['—']"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="label-xs text-muted-foreground">Education</h2>
          <ul className="mt-6 flex flex-col">
            {education.map((item, i) => (
              <Reveal as="li" key={`${item.org}-${item.role}`} delay={i * 0.05} className="border-t border-hairline py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-lg text-foreground">{item.role}</h3>
                  <span className="label-xs text-muted-foreground">{item.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.org} · {item.location}
                </p>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className="mt-14 grid gap-5 sm:grid-cols-2">
          <Reveal className="glass rounded-[24px] p-6">
            <h2 className="label-xs text-muted-foreground">Certifications</h2>
            <ul className="mt-4 space-y-3">
              {certifications.map((item) => (
                <li key={item} className="text-sm text-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="glass rounded-[24px] p-6">
            <h2 className="label-xs text-muted-foreground">Languages</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {languages.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-hairline px-3 py-1 text-[0.72rem] text-foreground/85"
                >
                  {item}
                </li>
              ))}
            </ul>
            <h2 className="label-xs mt-8 text-muted-foreground">Interests</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {interests.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-hairline px-3 py-1 text-[0.72rem] text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="mt-14">
          <h2 className="label-xs text-muted-foreground">Toolkit</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((cluster, i) => (
              <Reveal
                key={cluster.label}
                delay={i * 0.04}
                className="glass rounded-[24px] border border-hairline p-5"
              >
                <h3 className="text-sm text-foreground">{cluster.label}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {cluster.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-hairline px-3 py-1 text-[0.7rem] text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
