"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Clock, MapPin, Shield, Undo2, Users } from "lucide-react";
import { ClausePanel } from "@/components/clause-panel";
import { Disclaimer } from "@/components/disclaimer";
import { PageHeader } from "@/components/page-header";
import { PendingAnalysis } from "@/components/pending-analysis";
import { StatusBadge } from "@/components/status-badge";
import { buttonVariants } from "@/components/ui/button";
import {
  counts,
  executiveSummary,
  REPORT_HREF,
  findingReference,
  findings,
  findingsFor,
  getContract,
  sections,
} from "@/lib/data";
import { useDemo } from "@/lib/demo-context";
import type { SectionId } from "@/lib/types";
import { cn } from "@/lib/utils";

const sectionIcons: Record<SectionId, typeof Shield> = {
  confidentialite: Shield,
  localisation: MapPin,
  conservation: Clock,
  "sous-traitance": Users,
  reversibilite: Undo2,
};

export function AnalyseView() {
  const { analysisComplete } = useDemo();
  if (!analysisComplete) {
    return <PendingAnalysis eyebrow="Analyse des garanties" title="Lecture en attente" />;
  }
  return <AnalyseResults />;
}

function AnalyseResults() {
  const { activeFindingId, selectFinding } = useDemo();
  const contract = getContract("cloudnova");
  const active = findings.find((finding) => finding.id === activeFindingId) ?? findings[0];
  const headingRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = 0;
  }, [active.id]);

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, id: string) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const ids = findings.map((finding) => finding.id);
    const index = ids.indexOf(id);
    const next =
      event.key === "ArrowDown" ? Math.min(ids.length - 1, index + 1) : Math.max(0, index - 1);
    selectFinding(ids[next]);
    document.getElementById(`finding-${ids[next]}`)?.focus();
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Analyse des garanties"
        title={contract.title}
        description="Résumé destiné à un dirigeant. Chaque résultat renvoie à un article du contrat fictif, ou constate qu’aucun article ne traite le sujet."
        actions={
          <Link href={REPORT_HREF} className={buttonVariants({ size: "lg" })}>
            Consulter le rapport
          </Link>
        }
      />
      <Disclaimer />

      <section aria-labelledby="resume-dirigeant" className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/10 sm:p-6">
        <h2
          id="resume-dirigeant"
          ref={headingRef}
          tabIndex={-1}
          className="text-lg font-semibold tracking-tight outline-none"
        >
          En bref
        </h2>
        <div className="mt-3 flex max-w-3xl flex-col gap-3">
          {executiveSummary.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-6 text-foreground sm:text-base sm:leading-7">
              {paragraph}
            </p>
          ))}
        </div>
        <dl className="mt-5 grid gap-3 sm:grid-cols-3">
          <Count label="Garanties identifiées" value={counts.garantie} tone="text-ok" />
          <Count label="Points à clarifier" value={counts.clarifier} tone="text-clarify" />
          <Count label="Informations absentes" value={counts.absente} tone="text-missing" />
        </dl>
      </section>

      <p className="text-sm text-muted-foreground">
        Flèches haut et bas pour parcourir les résultats au clavier. L’extrait s’affiche à côté, ou
        au-dessus sur un petit écran.
      </p>

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <aside
          ref={panelRef}
          className="sticky top-16 z-20 max-h-[42vh] overflow-auto lg:top-6 lg:order-2 lg:max-h-[calc(100dvh-3rem)]"
        >
          <ClausePanel finding={active} />
        </aside>

        <div className="lg:order-1">
          {sections.map((section) => {
            const Icon = sectionIcons[section.id];
            return (
              <section key={section.id} aria-labelledby={`section-${section.id}`} className="mt-6 first:mt-0">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-turquoise">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <div>
                    <h2 id={`section-${section.id}`} className="text-base font-semibold tracking-tight">
                      {section.title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{section.lead}</p>
                  </div>
                </div>
                <ul className="mt-3 flex flex-col gap-2">
                  {findingsFor(section.id).map((finding) => {
                    const selected = finding.id === active.id;
                    return (
                      <li key={finding.id}>
                        <button
                          id={`finding-${finding.id}`}
                          type="button"
                          aria-pressed={selected}
                          aria-controls="panneau-clause"
                          onClick={() => selectFinding(finding.id)}
                          onKeyDown={(event) => onKeyDown(event, finding.id)}
                          className={cn(
                            "w-full cursor-pointer rounded-2xl bg-card px-4 py-3 text-left shadow-sm ring-1 ring-foreground/10 outline-none hover:ring-turquoise/40 focus-visible:ring-2 focus-visible:ring-turquoise",
                            selected && "ring-2 ring-turquoise",
                          )}
                        >
                          <StatusBadge status={finding.status} />
                          <span className="mt-2 block font-medium text-foreground">{finding.title}</span>
                          <span className="mt-1 block text-sm text-muted-foreground">
                            {findingReference(finding)}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Count({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="rounded-xl bg-muted/70 px-3 py-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={cn("mt-1 text-2xl font-semibold tabular-nums", tone)}>{value}</dd>
    </div>
  );
}
