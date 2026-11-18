"use client";

import Link from "next/link";
import { REPORT_HREF } from "@/lib/data";
import { useDemo } from "@/lib/demo-context";

export function SessionBanner() {
  const { analysisComplete } = useDemo();
  if (!analysisComplete) return null;

  return (
    <p className="rounded-2xl bg-card px-4 py-3 text-sm leading-6 shadow-sm ring-1 ring-foreground/10">
      La lecture simulée du contrat CloudNova AI est prête dans cette session.{" "}
      <Link href={REPORT_HREF} className="font-medium text-turquoise underline-offset-4 hover:underline">
        Ouvrir le rapport
      </Link>
    </p>
  );
}
