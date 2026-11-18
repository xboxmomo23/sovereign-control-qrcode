import type { Metadata } from "next";
import { ContractsBrowser } from "@/components/contracts-browser";
import { PageHeader } from "@/components/page-header";
import { clientCompany } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mes contrats",
  description: "Contrats fictifs des fournisseurs cloud et IA de TechIndustrie.",
};

export default function ContratsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Mes contrats"
        title={`Les contrats de ${clientCompany.name}`}
        description="Chaque fiche correspond à un fournisseur déjà utilisé ou seulement envisagé. Un outil peut être suivi sans que son contrat ait été analysé. Seul le texte de CloudNova AI est chargé pour la démonstration."
      />
      <ContractsBrowser />
    </div>
  );
}
