"use client";

import Link from "next/link";
import { Printer } from "lucide-react";
import { Disclaimer } from "@/components/disclaimer";
import { Logo } from "@/components/logo";
import { PageHeader } from "@/components/page-header";
import { PendingAnalysis } from "@/components/pending-analysis";
import { StatusBadge } from "@/components/status-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  clauses,
  counts,
  executiveSummary,
  findingReference,
  findings,
  getClause,
  getContract,
  getVendor,
  preparationNote,
  scopeNote,
} from "@/lib/data";
import { useDemo } from "@/lib/demo-context";
import type { FindingStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const groups: { status: FindingStatus; title: string; intro: string }[] = [
  {
    status: "garantie",
    title: "Engagements explicitement identifiés",
    intro: "Ces formulations sont écrites dans le contrat fictif. Elles sont reprises sans les élargir.",
  },
  {
    status: "clarifier",
    title: "Points à faire vérifier par une personne",
    intro: "Le texte en parle, mais une formulation reste ouverte. Une relecture humaine est nécessaire avant tout engagement réel.",
  },
  {
    status: "absente",
    title: "Informations manquantes",
    intro: "Aucun des sept articles ne traite ces sujets. L’absence n’est pas un refus : le document ne dit rien.",
  },
];

export function RapportView() {
  const { analysisComplete } = useDemo();
  if (!analysisComplete) {
    return <PendingAnalysis eyebrow="Rapport" title="Rapport non encore préparé" />;
  }
  return <ReportDocument />;
}

function ReportDocument() {
  const contract = getContract("cloudnova");
  const vendor = getVendor(contract.vendorId);
  const questions = findings.filter((finding) => finding.question);

  return (
    <div className="flex flex-col gap-6">
      <div className="no-print">
        <PageHeader
          eyebrow="Rapport"
          title="Lecture du contrat fictif"
          titleAs="p"
          description="Document à parcourir à l’écran ou à enregistrer via l’impression du navigateur."
          actions={
            <>
              <Button type="button" size="lg" onClick={() => window.print()}>
                <Printer aria-hidden="true" />
                Imprimer / Enregistrer en PDF
              </Button>
              <Link href="/rapport" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Tous les rapports
              </Link>
            </>
          }
        />
      </div>

      <article className="rounded-2xl bg-card px-5 py-6 shadow-sm ring-1 ring-foreground/10 print:shadow-none print:ring-0 sm:px-8 sm:py-8">
        <header className="report-block flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
          <Logo variant="document" />
          <div className="text-sm leading-6 text-muted-foreground sm:text-right">
            <p className="font-medium text-foreground">Rapport de lecture contractuelle</p>
            <p>{contract.reference}</p>
            <p>{contract.updatedLabel}</p>
            <p>Édition de maquette · 18 novembre 2026</p>
          </div>
        </header>

        <div className="mt-6">
          <Disclaimer />
        </div>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {contract.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {vendor.name} · {vendor.activity} · {vendor.city}
        </p>

        <section className="report-block mt-8" aria-labelledby="synthese">
          <h2 id="synthese" className="text-lg font-semibold tracking-tight">
            Synthèse exécutive
          </h2>
          <div className="mt-3 flex max-w-3xl flex-col gap-3">
            {executiveSummary.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-6 sm:text-base sm:leading-7">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <dl className="report-block mt-6 grid gap-3 sm:grid-cols-3">
          <Metric label="Engagements identifiés" value={counts.garantie} />
          <Metric label="Points à clarifier" value={counts.clarifier} />
          <Metric label="Informations absentes" value={counts.absente} />
        </dl>

        {groups.map((group) => (
          <section key={group.status} className="mt-8" aria-labelledby={`groupe-${group.status}`}>
            <h2 id={`groupe-${group.status}`} className="text-lg font-semibold tracking-tight">
              {group.title}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{group.intro}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {findings
                .filter((finding) => finding.status === group.status)
                .map((finding) => {
                  const clause = finding.clauseId ? getClause(finding.clauseId) : null;
                  return (
                    <li
                      key={finding.id}
                      className="report-block rounded-2xl bg-muted/40 px-4 py-3 ring-1 ring-foreground/5"
                    >
                      <StatusBadge status={finding.status} />
                      <p className="mt-2 font-medium text-foreground">{finding.title}</p>
                      <p className="mt-1 text-sm leading-6 text-foreground">{finding.explanation}</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Source : {findingReference(finding)}
                        {clause ? ` — ${clause.title}` : ""}
                      </p>
                    </li>
                  );
                })}
            </ul>
          </section>
        ))}

        <section className="mt-8" aria-labelledby="questions">
          <h2 id="questions" className="text-lg font-semibold tracking-tight">
            Questions à poser avant un engagement
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Ces questions reprennent uniquement les points à clarifier et les silences du texte.
            Elles se posent au fournisseur, puis se relisent avec la personne chargée des contrats.
          </p>
          <ol className="mt-4 flex list-decimal flex-col gap-3 pl-5">
            {questions.map((finding) => (
              <li key={finding.id} className="report-block text-sm leading-6">
                <span className="font-medium text-foreground">{findingReference(finding)}. </span>
                {finding.question}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8" aria-labelledby="annexe">
          <h2 id="annexe" className="text-lg font-semibold tracking-tight">
            Annexe — articles du contrat fictif
          </h2>
          <ol className="mt-4 flex flex-col gap-4">
            {clauses.map((clause) => (
              <li key={clause.id} className="report-block">
                <p className="text-sm font-medium">
                  {clause.reference} — {clause.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{clause.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="report-block mt-8 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
          <h2 className="text-base font-semibold text-foreground">Limites de cette maquette</h2>
          <p className="mt-2">{scopeNote}</p>
          <p className="mt-2">{preparationNote}</p>
        </section>
      </article>

      <p className="no-print text-sm text-muted-foreground">
        Pour obtenir un PDF, choisissez « Enregistrer au format PDF » comme destination dans la
        fenêtre d’impression.{" "}
        <Link href="/analyse" className="font-medium text-turquoise underline-offset-4 hover:underline">
          Revenir à l’analyse
        </Link>
        {" · "}
        <Link href="/" className="font-medium text-turquoise underline-offset-4 hover:underline">
          Tableau de bord
        </Link>
      </p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-muted/70 px-3 py-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={cn("mt-1 text-2xl font-semibold text-foreground tabular-nums")}>{value}</dd>
    </div>
  );
}
