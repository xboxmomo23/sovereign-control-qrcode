"use client";

import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { StatusBadge } from "@/components/status-badge";
import { clauseRollCall, getClause, REPORT_HREF } from "@/lib/data";
import type { Finding } from "@/lib/types";

export function ClausePanel({ finding }: { finding: Finding }) {
  const clause = finding.clauseId ? getClause(finding.clauseId) : null;

  return (
    <article
      id="panneau-clause"
      aria-live="polite"
      className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/10"
    >
      <p className="text-sm font-medium text-turquoise">Extrait du contrat fictif</p>
      <div className="mt-3">
        <StatusBadge status={finding.status} />
      </div>
      <h2 className="mt-3 text-lg font-semibold tracking-tight text-foreground">{finding.title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{finding.explanation}</p>
      {clause ? (
        <blockquote className="mt-4 border-l-2 border-turquoise pl-4">
          <p className="text-sm font-medium text-foreground">
            {clause.reference} — {clause.title}
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground">{clause.text}</p>
        </blockquote>
      ) : (
        <div className="mt-4 rounded-xl bg-missing-bg px-4 py-3 text-sm leading-6 text-missing">
          <p className="font-medium">Aucune clause correspondante</p>
          <p className="mt-1">
            Ce point n’apparaît dans aucun des articles {clauseRollCall}. « Information absente »
            signifie que le texte ne traite pas le sujet. Ce n’est pas un refus écrit du
            fournisseur.
          </p>
        </div>
      )}
      <Disclaimer className="mt-4" />
      <p className="mt-4 text-sm leading-6">
        <Link href={REPORT_HREF} className="font-medium text-turquoise underline-offset-4 hover:underline">
          Consulter le rapport
        </Link>
      </p>
    </article>
  );
}
