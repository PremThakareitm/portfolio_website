import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageFrame } from "@/components/layout/PageFrame";
import { Reveal } from "@/components/motion/Reveal";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: `Work — ${site.name}` },
      {
        name: "description",
        content:
          "Selected products and systems built by Prem Thakare across full-stack, AI automation, and cloud engineering.",
      },
      { property: "og:title", content: `Work — ${site.name}` },
      {
        property: "og:description",
        content: "Selected products and systems: platforms, AI features, and cloud delivery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <PageFrame>
      <main className="mx-auto max-w-[1400px] px-4 pb-24 pt-28 sm:px-8 sm:pt-40">
        <Reveal>
          <p className="label-xs text-muted-foreground">Selected work</p>
          <h1 className="display mt-4 max-w-3xl text-4xl text-foreground sm:text-6xl">
            {site.rooms.heading}
          </h1>
          <p className="mt-5 max-w-xl text-sm text-muted-foreground">
            {site.rooms.subheading}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 0.05}>
              <Link
                to="/work/$slug"
                params={{ slug: project.slug }}
                className="group card-surface flex h-full flex-col overflow-hidden rounded-[28px] transition-all duration-700 ease-[var(--ease-premium)] hover:scale-[1.015] hover:shadow-lift"
              >
                <MediaPlaceholder
                  kind="image"
                  src={project.media.src}
                  alt=""
                  {...(project.media.tone ? { tone: project.media.tone } : {})}
                  label={project.category}
                  className="aspect-16/10"
                  animated={false}
                />
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="display text-2xl text-foreground sm:text-3xl">
                      {project.title}
                    </h2>
                    {project.year ? (
                      <span className="label-xs text-muted-foreground">{project.year}</span>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">{project.role}</p>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <ul className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-hairline px-3 py-1 text-[0.7rem] text-muted-foreground"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                    <ArrowUpRight className="size-4 shrink-0 text-foreground transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </main>
    </PageFrame>
  );
}
