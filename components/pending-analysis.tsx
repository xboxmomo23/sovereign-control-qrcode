"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { StartDemoButton } from "@/components/start-demo-button";
import { Disclaimer } from "@/components/disclaimer";

export function PendingAnalysis({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description="La lecture simulée n’a pas encore été lancée dans cette session. Elle dure quelques secondes et reste dans votre navigateur."
      />
      <Card>
        <CardHeader>
          <CardTitle>Le contrat fictif est déjà choisi</CardTitle>
          <CardDescription>
            Le parcours utilise CloudNova AI – Conditions de traitement des données. Aucun document
            personnel n’est demandé.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-4">
          <StartDemoButton>Lancer l’analyse de démonstration</StartDemoButton>
          <Disclaimer />
        </CardContent>
      </Card>
    </div>
  );
}
