"use client";

import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/lib/demo-context";
import { cn } from "@/lib/utils";

export function ResetDemoButton({
  tone = "default",
}: {
  tone?: "default" | "sidebar";
}) {
  const { resetDemo } = useDemo();
  const router = useRouter();

  function reset() {
    resetDemo();
    router.push("/");
  }

  if (tone === "sidebar") {
    return (
      <button
        type="button"
        onClick={reset}
        className="mt-3 flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-medium text-sidebar-foreground/75 outline-none hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-turquoise-bright"
      >
        <RotateCcw aria-hidden="true" className="size-3.5 shrink-0" />
        Réinitialiser la démonstration
      </button>
    );
  }

  return (
    <Button type="button" variant="outline" onClick={reset} className={cn("bg-card")}>
      <RotateCcw aria-hidden="true" />
      Réinitialiser la démonstration
    </Button>
  );
}
