import { Download, Expand } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { site } from "@/data/site";

export function ResumePreview({ label = "Preview resume" }: { label?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="glass inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm text-foreground transition-transform duration-500 ease-[var(--ease-premium)] hover:scale-[1.02]"
        >
          {label}
        </button>
      </DialogTrigger>
      <DialogContent className="glass-strong max-h-[90vh] w-[min(960px,calc(100vw-1.5rem))] max-w-none overflow-hidden rounded-[28px] border-hairline p-4 sm:p-6">
        <DialogHeader className="flex flex-row flex-wrap items-center justify-between gap-3 pr-8 text-left">
          <div>
            <DialogTitle className="display text-2xl">Resume</DialogTitle>
            <DialogDescription className="mt-1 text-xs text-muted-foreground">
              Prem Thakare — Full-Stack Developer
            </DialogDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex min-h-9 items-center gap-2 rounded-full px-4 text-xs text-foreground"
            >
              Open tab <Expand className="size-3.5" />
            </a>
            <a
              href={site.resume}
              download
              className="inline-flex min-h-9 items-center gap-2 rounded-full bg-foreground px-4 text-xs text-background"
            >
              Download <Download className="size-3.5" />
            </a>
          </div>
        </DialogHeader>
        <iframe
          title="Prem Thakare resume preview"
          src={`${site.resume}#view=FitH`}
          className="mt-3 h-[min(70vh,720px)] w-full rounded-[18px] border border-hairline bg-background"
        />
      </DialogContent>
    </Dialog>
  );
}
