"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  contractIsAnalyzed,
  contracts,
  REPORT_HREF,
  usageLabel,
  vendors,
  verificationLabel,
} from "@/lib/data";
import { useDemo } from "@/lib/demo-context";
import type { ToolUsage } from "@/lib/types";
import { cn } from "@/lib/utils";

const tone: Record<ToolUsage, string> = {
  utilise: "border-transparent bg-ok-bg text-ok",
  envisage: "border-transparent bg-clarify-bg text-clarify",
};

const actionClass =
  "inline-flex cursor-pointer items-center rounded-lg px-2 py-1 text-sm font-medium text-turquoise outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-turquoise";

export function VendorTable() {
  const { analysisComplete, selectContract } = useDemo();
  const router = useRouter();

  function openContract(id: string) {
    selectContract(id);
    router.push("/contrats");
  }

  function launch(id: string) {
    selectContract(id);
    router.push("/nouvelle");
  }

  return (
    <>
      <div className="hidden md:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">
            Fournisseurs de TechIndustrie, statut d’usage et état de vérification
          </caption>
          <thead className="text-xs text-muted-foreground">
            <tr className="border-b border-border">
              <th scope="col" className="px-4 py-3 font-medium">
                Fournisseur
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Service
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Statut
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Vérification
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => {
              const ready = contracts.some((contract) => contract.id === vendor.id && contract.demoReady);
              const analyzed = contractIsAnalyzed(vendor.id, analysisComplete);
              return (
                <tr key={vendor.id} className="border-b border-border last:border-0">
                  <th scope="row" className="px-4 py-3 font-medium text-foreground">
                    {vendor.name}
                    <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                      {vendor.city}
                    </span>
                  </th>
                  <td className="px-4 py-3 text-muted-foreground">{vendor.activity}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={cn("h-6", tone[vendor.usage])}>
                      {usageLabel[vendor.usage]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {verificationLabel(vendor.id, analysisComplete)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap justify-end gap-1">
                      <button type="button" onClick={() => openContract(vendor.id)} className={actionClass}>
                        Consulter le contrat
                      </button>
                      <button type="button" onClick={() => launch(vendor.id)} className={actionClass}>
                        Lancer une analyse
                      </button>
                      {ready && analyzed ? (
                        <Link href={REPORT_HREF} className={actionClass}>
                          Voir le rapport
                        </Link>
                      ) : null}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ul className="flex flex-col gap-3 p-4 md:hidden">
        {vendors.map((vendor) => {
          const ready = contracts.some((contract) => contract.id === vendor.id && contract.demoReady);
          const analyzed = contractIsAnalyzed(vendor.id, analysisComplete);
          return (
            <li key={vendor.id} className="rounded-xl bg-muted/50 p-3">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium text-foreground">{vendor.name}</p>
                <Badge variant="outline" className={cn("h-6", tone[vendor.usage])}>
                  {usageLabel[vendor.usage]}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {vendor.activity} · {vendor.city}
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground">
                {verificationLabel(vendor.id, analysisComplete)}
              </p>
              <div className="mt-2 flex flex-col items-start gap-1">
                <button type="button" onClick={() => openContract(vendor.id)} className={actionClass}>
                  Consulter le contrat
                </button>
                <button type="button" onClick={() => launch(vendor.id)} className={actionClass}>
                  Lancer une analyse
                </button>
                {ready && analyzed ? (
                  <Link href={REPORT_HREF} className={actionClass}>
                    Voir le rapport
                  </Link>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
