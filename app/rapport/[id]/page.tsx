import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { RapportView } from "@/components/rapport-view";
import { DEMO_CONTRACT_ID } from "@/lib/data";

export const metadata: Metadata = {
  title: "Rapport CloudNova AI",
  description: "Synthèse simulée du contrat fictif CloudNova AI.",
};

export function generateStaticParams() {
  return [{ id: DEMO_CONTRACT_ID }];
}

export default function RapportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Préparation du rapport…</p>}>
      <ReportGate params={params} />
    </Suspense>
  );
}

async function ReportGate({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (id !== DEMO_CONTRACT_ID) notFound();
  return <RapportView />;
}
