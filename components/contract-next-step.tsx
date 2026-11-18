"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StartDemoButton } from "@/components/start-demo-button";
import { clientCompany, getContract, getVendor } from "@/lib/data";
import { useDemo } from "@/lib/demo-context";

export function ContractNextStep() {
  const { selectedContractId } = useDemo();
  const contract = getContract(selectedContractId);
  const vendor = getVendor(contract.vendorId);

  if (contract.demoReady) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Texte prêt pour une lecture</CardTitle>
          <CardDescription>
            Le contrat {vendor.name} est chargé. La lecture simulée se prépare dans Nouvelle
            analyse, puis la synthèse rejoint Rapports.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StartDemoButton>Préparer la lecture</StartDemoButton>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contrat au dossier</CardTitle>
        <CardDescription>
          {vendor.name} fait partie des outils de {clientCompany.name}. Son texte intégral n’est
          pas chargé dans cette maquette, pour ne pas inventer de garanties. La lecture clause par
          clause disponible ici est celle de CloudNova AI.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
