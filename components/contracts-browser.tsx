"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  contractIsAnalyzed,
  contracts,
  getVendor,
  REPORT_HREF,
  usageLabel,
  verificationLabel,
} from "@/lib/data";
import { useDemo } from "@/lib/demo-context";
import type { ToolUsage } from "@/lib/types";
import { cn } from "@/lib/utils";

type UsageFilter = "tous" | ToolUsage;
type AnalysisFilter = "tous" | "analyse" | "non";

const usageOptions: { id: UsageFilter; label: string }[] = [
  { id: "tous", label: "Tous les usages" },
  { id: "utilise", label: "Utilisé" },
  { id: "envisage", label: "Envisagé" },
];

const analysisOptions: { id: AnalysisFilter; label: string }[] = [
  { id: "tous", label: "Tous les états" },
  { id: "analyse", label: "Analysé" },
  { id: "non", label: "Non analysé" },
];

const actionClass =
  "inline-flex cursor-pointer items-center rounded-lg px-2 py-1 text-sm font-medium text-turquoise outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-turquoise";

export function ContractsBrowser() {
  const { analysisComplete, selectedContractId, selectContract } = useDemo();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [usage, setUsage] = useState<UsageFilter>("tous");
  const [analysis, setAnalysis] = useState<AnalysisFilter>("tous");
  const [openId, setOpenId] = useState<string | null>(selectedContractId);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return contracts.filter((contract) => {
      const vendor = getVendor(contract.vendorId);
      const analyzed = contractIsAnalyzed(contract.id, analysisComplete);
      if (usage !== "tous" && vendor.usage !== usage) return false;
      if (analysis === "analyse" && !analyzed) return false;
      if (analysis === "non" && analyzed) return false;
      if (!needle) return true;
      const haystack = `${vendor.name} ${vendor.activity} ${contract.title} ${contract.reference}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [analysis, analysisComplete, query, usage]);

  function launch(id: string) {
    selectContract(id);
    router.push("/nouvelle");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-2xl bg-card p-4 shadow-sm ring-1 ring-foreground/10">
        <div>
          <label htmlFor="recherche-contrat" className="text-sm font-medium text-foreground">
            Rechercher un contrat
          </label>
          <input
            id="recherche-contrat"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Nom, service ou référence"
            className="mt-2 h-10 w-full rounded-xl bg-background px-3 text-sm outline-none ring-1 ring-foreground/10 placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-turquoise"
          />
        </div>
        <fieldset>
          <legend className="text-sm font-medium text-foreground">Usage</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {usageOptions.map((option) => (
              <FilterButton
                key={option.id}
                pressed={usage === option.id}
                onClick={() => setUsage(option.id)}
              >
                {option.label}
              </FilterButton>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-medium text-foreground">Analyse</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {analysisOptions.map((option) => (
              <FilterButton
                key={option.id}
                pressed={analysis === option.id}
                onClick={() => setAnalysis(option.id)}
              >
                {option.label}
              </FilterButton>
            ))}
          </div>
        </fieldset>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-2xl bg-card px-4 py-8 text-center shadow-sm ring-1 ring-foreground/10">
          <p className="font-medium text-foreground">Aucun contrat ne correspond</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Modifiez la recherche ou les filtres. Au départ, les quatre contrats sont suivis et
            aucun n’est encore analysé.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3" aria-label="Contrats de TechIndustrie">
          {visible.map((contract) => {
            const vendor = getVendor(contract.vendorId);
            const analyzed = contractIsAnalyzed(contract.id, analysisComplete);
            const open = openId === contract.id;
            return (
              <li
                key={contract.id}
                className={cn(
                  "rounded-2xl bg-card p-4 shadow-sm ring-1 ring-foreground/10",
                  contract.id === selectedContractId && "ring-2 ring-turquoise",
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-turquoise">{vendor.name}</p>
                    <h2 className="mt-1 text-base font-semibold tracking-tight text-foreground">
                      {contract.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {vendor.activity} · {contract.reference}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        "h-6",
                        vendor.usage === "utilise"
                          ? "border-transparent bg-ok-bg text-ok"
                          : "border-transparent bg-clarify-bg text-clarify",
                      )}
                    >
                      {usageLabel[vendor.usage]}
                    </Badge>
                    <Badge variant="outline" className="h-6">
                      {analyzed ? "Analysé" : "Non analysé"}
                    </Badge>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {verificationLabel(contract.id, analysisComplete)} · {contract.updatedLabel}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => {
                      selectContract(contract.id);
                      setOpenId(open ? null : contract.id);
                    }}
                    className={actionClass}
                  >
                    {open ? "Masquer les informations" : "Consulter les informations"}
                  </button>
                  <button type="button" onClick={() => launch(contract.id)} className={actionClass}>
                    Lancer une analyse
                  </button>
                  {analyzed ? (
                    <Link href={REPORT_HREF} className={actionClass}>
                      Consulter le rapport
                    </Link>
                  ) : null}
                </div>
                {open ? (
                  <div className="mt-3 rounded-xl bg-muted/60 px-3 py-3 text-sm leading-6 text-foreground">
                    <p>{contract.description}</p>
                    <p className="mt-2 text-muted-foreground">
                      {contract.demoReady
                        ? "Les sept articles sont chargés pour la lecture de démonstration."
                        : "Le fournisseur est suivi. Le contrat n’a pas été analysé, car son texte n’est pas chargé."}
                    </p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function FilterButton({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-full px-3 py-1.5 text-sm outline-none ring-1 ring-foreground/10 focus-visible:ring-2 focus-visible:ring-turquoise",
        pressed ? "bg-night text-primary-foreground" : "bg-background text-foreground hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}
