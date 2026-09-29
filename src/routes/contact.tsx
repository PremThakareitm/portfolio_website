import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageFrame } from "@/components/layout/PageFrame";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { ResumePreview } from "@/components/system/ResumePreview";
import { site } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${site.name}` },
      {
        name: "description",
        content:
          "Get in touch with Prem Thakare about full-stack, AI automation, and cloud engineering work.",
      },
      { property: "og:title", content: `Contact — ${site.name}` },
      {
        property: "og:description",
        content: "Let's turn an idea into something useful.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const links = [
  { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  {
    label: "Phone",
    value: site.contact.phone,
    href: `tel:${site.contact.phone.replace(/\s/g, "")}`,
  },
  { label: "LinkedIn", value: site.contact.linkedinLabel, href: site.contact.linkedin },
  { label: "GitHub", value: site.contact.githubLabel, href: site.contact.github },
];

function ContactPage() {
  return (
    <PageFrame>
      <main className="mx-auto max-w-[1000px] px-4 pb-24 pt-28 sm:px-8 sm:pt-40">
        <Reveal>
          <p className="label-xs text-muted-foreground">Contact</p>
          <h1 className="display mt-4 max-w-2xl text-4xl text-foreground sm:text-6xl">
            {site.contact.heading}
          </h1>
          <p className="mt-5 max-w-xl text-sm text-muted-foreground">
            {site.contact.support} Open to internships, freelance, and collaborations.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <ContactForm />
          </Reveal>
          <div>
            <ul className="grid gap-4">
              {links.map((link, i) => (
                <Reveal as="li" key={link.label} delay={i * 0.05}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="glass group block rounded-[24px] border border-hairline p-6 transition-all duration-500 hover:scale-[1.015] hover:shadow-lift"
                  >
                    <span className="label-xs text-muted-foreground">{link.label}</span>
                    <span className="mt-3 flex items-center justify-between gap-3 text-base text-foreground">
                      {link.value}
                      <ArrowUpRight className="size-4 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-8 flex flex-wrap gap-3">
              <ResumePreview />
              <a
                href={site.resume}
                download
                className="glass inline-flex min-h-11 items-center gap-2 rounded-full px-6 text-sm text-foreground"
              >
                Download resume
                <ArrowUpRight className="size-4" />
              </a>
            </Reveal>
            <p className="mt-8 text-sm text-muted-foreground">
              {site.contact.location} · {site.hero.availability}
            </p>
          </div>
        </div>
      </main>
    </PageFrame>
  );
}
