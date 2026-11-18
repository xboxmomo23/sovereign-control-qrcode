import type { Metadata } from "next";
import { AnalyseView } from "@/components/analyse-view";

export const metadata: Metadata = {
  title: "Analyse des garanties",
  description: "Résultats simulés de la lecture du contrat fictif CloudNova AI.",
};

export default function AnalysePage() {
  return <AnalyseView />;
}
