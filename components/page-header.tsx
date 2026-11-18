import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  titleAs = "h1",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  titleAs?: "h1" | "p";
}) {
  const TitleTag = titleAs;
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-turquoise">{eyebrow}</p>
        <TitleTag className="mt-1 text-[1.65rem] font-semibold tracking-tight text-balance text-foreground sm:text-3xl">
          {title}
        </TitleTag>
        {description ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="no-print flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}
