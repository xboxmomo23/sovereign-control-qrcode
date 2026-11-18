import type { Metadata } from "next";
import { ContractPicker } from "@/components/contract-picker";
import { LaunchPanel } from "@/components/launch-panel";
import { PageHeader } from "@/components/page-header";
import { clientCompany } from "@/lib/data";

export const metadata: Metadata = {
  title: "Nouvelle analyse",
  description: "Lecture simulée du contrat fictif CloudNova AI, sans envoi de document.",
};

export default function NouvellePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Nouvelle analyse"
        title="Lancer la lecture d’un contrat de l’entreprise"
        description={`Choisissez un contrat de ${clientCompany.name}. Seul CloudNova AI a ses sept articles chargés. La lecture est simulée dans le navigateur, sans envoi de document.`}
      />
      <ContractPicker variant="compact" />
      <LaunchPanel />
    </div>
  );
}
