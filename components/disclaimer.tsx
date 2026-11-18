import { SIMULATION_NOTICE } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Disclaimer({ className }: { className?: string }) {
  return (
    <p
      role="note"
      className={cn(
        "rounded-2xl border border-border bg-accent px-4 py-3 text-sm leading-6 text-accent-foreground",
        className,
      )}
    >
      {SIMULATION_NOTICE}
    </p>
  );
}
