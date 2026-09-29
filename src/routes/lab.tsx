import { createFileRoute } from "@tanstack/react-router";
import { PageFrame } from "@/components/layout/PageFrame";
import { Reveal } from "@/components/motion/Reveal";
import { lab } from "@/data/lab";
import { site } from "@/data/site";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: `Lab — ${site.name}` },
      {
        name: "description",
        content:
          "Ongoing experiments in AI automation, local LLMs, Playwright workflows, and interface motion by Prem Thakare.",
      },
      { property: "og:title", content: `Lab — ${site.name}` },
      {
        property: "og:description",
        content: "Experiments and prototypes in AI automation, local LLMs, and interface motion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LabPage,
});

function LabPage() {
  return (
    <PageFrame>
      <main className="mx-auto max-w-[1200px] px-4 pb-24 pt-28 sm:px-8 sm:pt-40">
        <Reveal>
          <p className="label-xs text-muted-foreground">Lab</p>
          <h1 className="display mt-4 max-w-2xl text-4xl text-foreground sm:text-6xl">
            Work in progress.
          </h1>
          <p className="mt-5 max-w-xl text-sm text-muted-foreground">
            Experiments in browser automation, local LLMs, and interface motion — kept
            here while they develop.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lab.map((entry, i) => (
            <Reveal
              as="li"
              key={entry.title}
              delay={i * 0.05}
              className="glass flex flex-col rounded-[24px] border border-hairline p-6"
            >
              <span className="label-xs text-muted-foreground">{entry.state}</span>
              <h2 className="display mt-4 text-2xl text-foreground">{entry.title}</h2>
              <p className="label-xs mt-2 text-muted-foreground">{entry.category}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{entry.note}</p>
            </Reveal>
          ))}
        </ul>
      </main>
    </PageFrame>
  );
}
