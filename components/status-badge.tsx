"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { FindingStatus } from "@/lib/types";

const meta: Record<FindingStatus, { label: string; className: string }> = {
  garantie: {
    label: "Garantie identifiée",
    className: "border-transparent bg-ok-bg text-ok",
  },
  clarifier: {
    label: "Point à clarifier",
    className: "border-transparent bg-clarify-bg text-clarify",
  },
  absente: {
    label: "Information absente",
    className: "border-transparent bg-missing-bg text-missing",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: FindingStatus;
  className?: string;
}) {
  const item = meta[status];
  return (
    <Badge variant="outline" className={cn("h-6 px-2", item.className, className)}>
      {item.label}
    </Badge>
  );
}
