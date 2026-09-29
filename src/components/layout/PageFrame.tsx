import { type ReactNode } from "react";
import { SiteNav } from "@/components/navigation/SiteNav";
import { cn } from "@/lib/utils";

export function PageFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative min-h-screen", className)}>
      <SiteNav />
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
    </div>
  );
}
