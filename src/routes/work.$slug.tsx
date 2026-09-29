import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageFrame } from "@/components/layout/PageFrame";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { Reveal } from "@/components/motion/Reveal";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { slug: project.slug };
  },
  head: ({ loaderData }) => {
    const project = loaderData
      ? projects.find((p) => p.slug === loaderData.slug)
      : undefined;
    if (!project) {
      return {
        meta: [{ title: `Project not found — ${site.name}` }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${project.title} — ${site.name}`;
    return {
      meta: [
        { title },
        { name: "description", content: project.description },
        { property: "og:title", content: title },
        { property: "og:description", content: project.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectRoom,
  notFoundComponent: ProjectNotFound,
  errorComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <PageFrame>
      <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-5 sm:px-8">
        <h1 className="display text-4xl text-foreground">Room unavailable</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This project room doesn't exist. Browse the full selection instead.
        </p>
        <Link
          to="/work"
          className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-foreground px-6 text-sm text-background"
        >
          <ArrowLeft className="size-4" /> All work
        </Link>
      </main>
    </PageFrame>
  );
}

function ProjectRoom() {
  const { slug } = Route.useLoaderData();
  const reduce = useReducedMotion();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <ProjectNotFound />;

  const enter = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <PageFrame>
      <motion.main {...enter} className="pb-24">
        <div className="relative">
          <MediaPlaceholder
            kind="image"
            src={project.media.src}
            {...(project.media.tone ? { tone: project.media.tone } : {})}
            className="h-[46svh] min-h-[280px] w-full"
            label={project.category}
            animated={false}
          />
        </div>

        <div className="mx-auto max-w-[1100px] px-4 sm:px-8">
          <div className="card-surface -mt-16 rounded-[32px] p-7 sm:p-12">
            <Link
              to="/work"
              className="label-xs inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" /> Close room
            </Link>
            <h1 className="display mt-6 text-4xl text-foreground sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              <Meta term="Category" value={project.category} />
              <Meta term="Role" value={project.role} />
              <Meta term="Year" value={project.year ?? "—"} />
            </dl>
            <ul className="mt-8 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-hairline px-3 py-1 text-[0.72rem] text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
            {project.status ? (
              <p className="label-xs mt-6 text-muted-foreground">{project.status}</p>
            ) : null}
          </div>

          {project.stats?.length ? (
            <Reveal className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {project.stats.map((stat) => (
                <div key={stat.label} className="glass rounded-[20px] p-5">
                  <p className="display text-2xl text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </Reveal>
          ) : null}

          <Block title="Overview" body={project.overview} />
          <Block title="Problem" body={project.problem} />

          <Reveal className="mt-16">
            <h2 className="display text-2xl text-foreground sm:text-3xl">
              Implementation
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.implementation.map((item) => (
                <li
                  key={item}
                  className="glass rounded-[20px] p-5 text-sm leading-relaxed text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-16">
            <h2 className="display text-2xl text-foreground sm:text-3xl">Features</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-hairline px-4 py-2 text-xs text-foreground/85"
                >
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Block title="Architecture" body={project.architecture} />
          <Block title="Outcome" body={project.outcome} />

          {project.links?.length ? (
            <Reveal className="mt-12 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass inline-flex min-h-11 items-center gap-2 rounded-full px-6 text-sm text-foreground"
                >
                  {l.label} <ArrowUpRight className="size-4" />
                </a>
              ))}
            </Reveal>
          ) : null}

          <div className="mt-16 border-t border-hairline pt-8">
            <Link
              to="/work"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm text-background"
            >
              <ArrowLeft className="size-4" /> Back to all work
            </Link>
          </div>
        </div>
      </motion.main>
    </PageFrame>
  );
}

function Meta({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="label-xs text-muted-foreground">{term}</dt>
      <dd className="mt-2 text-sm text-foreground">{value}</dd>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <Reveal className="mt-16 max-w-3xl">
      <h2 className="display text-2xl text-foreground sm:text-3xl">{title}</h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </Reveal>
  );
}
