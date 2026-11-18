"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { ResetDemoButton } from "@/components/reset-demo-button";
import { SessionBanner } from "@/components/session-banner";
import { StartDemoButton } from "@/components/start-demo-button";
import { VendorTable } from "@/components/vendor-table";
import { clientCompany, counts } from "@/lib/data";
import { useDemo } from "@/lib/demo-context";

const steps = [
  "Ouvrir le contrat CloudNova AI, déjà en service.",
  "Lancer l’analyse de démonstration, sans déposer de fichier.",
  "Ouvrir un résultat pour lire l’article correspondant.",
  "Consulter le rapport, puis l’imprimer si besoin.",
];

export function DashboardView() {
  const { analysisComplete, notice } = useDemo();
  const analyzed = analysisComplete ? 1 : 0;
  const clarifier = analysisComplete ? counts.clarifier : 0;

  const stats = [
    {
      label: "Fournisseurs suivis",
      value: counts.tools,
      detail: "Outils utilisés ou envisagés par TechIndustrie.",
    },
    {
      label: "Contrats analysés",
      value: analyzed,
      detail: analysisComplete
        ? "Lecture simulée du contrat CloudNova AI."
        : "Aucune lecture lancée pour le moment.",
    },
    {
      label: "Points à clarifier",
      value: clarifier,
      detail: analysisComplete
        ? "Questions ouvertes dans le texte fictif CloudNova AI."
        : "Ils apparaîtront après la lecture simulée.",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {notice ? (
        <p role="status" className="rounded-2xl bg-accent px-4 py-3 text-sm leading-6 text-accent-foreground">
          {notice}
        </p>
      ) : null}
      <SessionBanner />
      <PageHeader
        eyebrow={`${clientCompany.name} · ${clientCompany.contactName}`}
        title={clientCompany.name}
        description={`${clientCompany.activity} de ${clientCompany.employees} salariés. ${clientCompany.contactName}, ${clientCompany.contactRole.toLowerCase()}, suit ici uniquement les outils cloud et IA déjà utilisés ou envisagés. Cet inventaire n’est pas la base de connaissances générale de Sovereign Control.`}
        actions={
          <>
            <StartDemoButton>Lancer une analyse</StartDemoButton>
            <ResetDemoButton />
          </>
        }
      />

      <section aria-label="Vue de l’environnement numérique" className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{stat.detail}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <Card>
          <CardHeader>
            <CardTitle>Fournisseurs de l’entreprise</CardTitle>
            <CardDescription>
              Quatre fournisseurs fictifs de {clientCompany.name}. Le suivi d’un outil ne signifie
              pas que son contrat a été analysé.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <VendorTable />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Parcours de présentation</CardTitle>
            <CardDescription>
              Le seul texte chargé est le contrat CloudNova AI, déjà utilisé.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="flex flex-col gap-3">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-6">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-turquoise">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
