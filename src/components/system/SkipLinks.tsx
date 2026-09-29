export function SkipLinks() {
  return (
    <nav aria-label="Skip" className="fixed left-3 top-3 z-[200] flex flex-col gap-2">
      <a
        href="#main-content"
        className="absolute -translate-y-[180%] rounded-full bg-foreground px-4 py-2 text-sm text-background shadow-lift transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <a
        href="#site-chat"
        className="absolute top-12 -translate-y-[220%] rounded-full bg-foreground px-4 py-2 text-sm text-background shadow-lift transition-transform focus:translate-y-0"
      >
        Skip to voice guide
      </a>
    </nav>
  );
}
