"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StartDemoButton } from "@/components/start-demo-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  clientCompany,
  counts,
  DEMO_CONTRACT_ID,
  getContract,
  getVendor,
  REPORT_HREF,
} from "@/lib/data";
import { useDemo } from "@/lib/demo-context";

export function ReportsList() {
  const { analysisComplete } = useDemo();
  const contract = getContract(DEMO_CONTRACT_ID);
  const vendor = getVendor(contract.vendorId);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Rapports"
        title={`Synthèses de ${clientCompany.name}`}
        description="Les synthèses simulées de TechIndustrie apparaissent ici après la lecture de démonstration. Elles reprennent le contrat fictif et ne valent pas validation juridique."
      />

      {analysisComplete ? (
        <Card>
          <CardHeader>
            <CardDescription>
              {vendor.name} · {contract.reference}
            </CardDescription>
            <CardTitle className="text-lg">{contract.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-4">
            <p className="text-sm leading-6 text-muted-foreground">
              Lecture simulée de la session. {counts.garantie} garanties identifiées,{" "}
              {counts.clarifier} points à clarifier, {counts.absente} informations absentes.
            </p>
            <Link
              href={REPORT_HREF}
              className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-turquoise outline-none hover:underline focus-visible:ring-2 focus-visible:ring-turquoise"
            >
              Consulter le rapport
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Aucun rapport pour le moment</CardTitle>
            <CardDescription>
              Lancez l’analyse de démonstration du contrat CloudNova AI. La synthèse sera listée
              ici, dans le navigateur.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StartDemoButton>Aller à Nouvelle analyse</StartDemoButton>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
