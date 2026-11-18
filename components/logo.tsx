import Link from "next/link";
import { cn } from "@/lib/utils";

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-5" aria-hidden="true">
      <circle cx="16" cy="16" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="16" r="2.2" fill="currentColor" />
      <path
        d="M16 5.5v3.2M16 23.3V26.5M5.5 16h3.2M23.3 16H26.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ variant = "sidebar" }: { variant?: "sidebar" | "document" }) {
  const onDark = variant === "sidebar";

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-turquoise-bright",
        onDark ? "text-sidebar-foreground" : "text-foreground",
      )}
    >
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-xl text-turquoise-bright",
          onDark ? "bg-white/10" : "bg-night",
        )}
        aria-hidden="true"
      >
        <Mark />
      </span>
      <span>
        <span className="block text-[15px] leading-none font-semibold tracking-tight">
          Sovereign Control
        </span>
        <span
          className={cn(
            "mt-1 block text-xs",
            onDark ? "text-sidebar-foreground/65" : "text-muted-foreground",
          )}
        >
          Lecture des contrats
        </span>
      </span>
    </Link>
  );
}
