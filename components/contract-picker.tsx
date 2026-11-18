"use client";

import { contracts, getVendor, usageLabel } from "@/lib/data";
import { useDemo } from "@/lib/demo-context";
import { cn } from "@/lib/utils";

export function ContractPicker({ variant = "detailed" }: { variant?: "detailed" | "compact" }) {
  const { selectedContractId, selectContract } = useDemo();

  if (variant === "compact") {
    return (
      <div>
        <p id="choix-contrat" className="text-sm font-medium text-foreground">
          Contrat choisi pour la lecture
        </p>
        <div
          role="radiogroup"
          aria-labelledby="choix-contrat"
          className="mt-2 flex gap-2 overflow-x-auto pb-1"
        >
          {contracts.map((contract) => {
            const selected = contract.id === selectedContractId;
            return (
              <button
                key={contract.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => selectContract(contract.id)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-2 text-sm ring-1 ring-foreground/10 outline-none focus-visible:ring-2 focus-visible:ring-turquoise",
                  selected
                    ? "bg-night text-primary-foreground"
                    : "bg-card text-foreground hover:bg-muted",
                )}
              >
                {getVendor(contract.vendorId).name}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Contrats de l’entreprise"
      className="grid gap-3"
    >
      {contracts.map((contract) => {
        const selected = contract.id === selectedContractId;
        const vendor = getVendor(contract.vendorId);
        return (
          <button
            key={contract.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => selectContract(contract.id)}
            className={cn(
              "rounded-2xl bg-card p-4 text-left shadow-sm ring-1 ring-foreground/10 outline-none transition hover:ring-turquoise/50 focus-visible:ring-2 focus-visible:ring-turquoise",
              selected && "ring-2 ring-turquoise",
            )}
          >
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-turquoise">{vendor.name}</span>
              <span className="text-xs text-muted-foreground">{contract.reference}</span>
              {selected ? (
                <span className="text-xs font-medium text-foreground">Sélectionné</span>
              ) : null}
            </span>
            <span className="mt-1 block text-base font-semibold tracking-tight text-foreground">
              {contract.title}
            </span>
            <span className="mt-2 block text-sm leading-6 text-muted-foreground">
              {contract.description}
            </span>
            <span className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground">
                {contract.updatedLabel}
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-1",
                  vendor.usage === "utilise" ? "bg-ok-bg text-ok" : "bg-clarify-bg text-clarify",
                )}
              >
                {usageLabel[vendor.usage]}
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-1",
                  contract.demoReady ? "bg-ok-bg text-ok" : "bg-muted text-muted-foreground",
                )}
              >
                {contract.demoReady ? "Texte disponible pour la lecture" : "Au dossier"}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
