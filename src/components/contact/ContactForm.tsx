import { useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAudio } from "@/hooks/useExperience";

const phpEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;
const formSubmit = `https://formsubmit.co/ajax/${site.contact.email}`;

export function ContactForm() {
  const { play } = useAudio();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("website") ?? "")) return;

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      _subject: `Portfolio message from ${String(data.get("name") ?? "").trim()}`,
      _template: "table",
      _captcha: "false",
    };

    setStatus("sending");
    setError("");
    play("click");

    const endpoints = phpEndpoint ? [phpEndpoint, formSubmit] : [formSubmit];
    let ok = false;
    let lastError = "Could not send. Try email instead.";

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        const json = (await res.json().catch(() => ({}))) as { ok?: boolean; success?: string };
        if (res.ok && json.ok !== false) {
          ok = true;
          break;
        }
        lastError =
          typeof (json as { error?: string }).error === "string"
            ? (json as { error: string }).error
            : lastError;
      } catch {
        /* try next endpoint */
      }
    }

    if (ok) {
      setStatus("sent");
      form.reset();
      play("transition");
      return;
    }
    setStatus("error");
    setError(lastError);
  }

  if (status === "sent") {
    return (
      <div className="glass rounded-[24px] p-8">
        <p className="label-xs text-muted-foreground">Sent</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground">
          Message received — Prem will see it in {site.contact.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass flex flex-col gap-4 rounded-[24px] p-6 sm:p-8">
      <p className="label-xs text-muted-foreground">Write to Prem</p>
      <label className="grid gap-2 text-sm" htmlFor="contact-name">
        <span className="text-foreground">Name</span>
        <Input id="contact-name" required name="name" autoComplete="name" className="h-11 rounded-2xl" />
      </label>
      <label className="grid gap-2 text-sm" htmlFor="contact-email">
        <span className="text-foreground">Email</span>
        <Input
          id="contact-email"
          required
          type="email"
          name="email"
          autoComplete="email"
          className="h-11 rounded-2xl"
        />
      </label>
      <label className="grid gap-2 text-sm" htmlFor="contact-message">
        <span className="text-foreground">Message</span>
        <Textarea id="contact-message" required name="message" rows={6} className="rounded-2xl" />
      </label>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      {status === "error" ? (
        <p className="text-sm text-destructive">
          {error} Or email{" "}
          <a className="underline" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>
          .
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
