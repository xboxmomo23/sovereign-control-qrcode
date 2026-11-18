import type { Metadata } from "next";
import { ReportsList } from "@/components/reports-list";

export const metadata: Metadata = {
  title: "Rapports",
  description: "Synthèses simulées préparées pour l’entreprise cliente fictive.",
};

export default function RapportPage() {
  return <ReportsList />;
}
