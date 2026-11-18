"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Upload } from "lucide-react";
import { Disclaimer } from "@/components/disclaimer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import {
  clauses,
  DEMO_CONTRACT_ID,
  getContract,
  getVendor,
  readingSteps,
} from "@/lib/data";
import { useDemo } from "@/lib/demo-context";
import { cn } from "@/lib/utils";

export function LaunchPanel() {
  const { selectedContractId, selectContract, completeAnalysis, analysisComplete } = useDemo();
  const contract = getContract(selectedContractId);
  const vendor = getVendor(contract.vendorId);
  const ready = contract.demoReady;
  const router = useRouter();
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const timer = useRef<number | null>(null);
  const finished = useRef(false);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  function explainImport() {
    setImportMessage(
      "L’analyse de fichiers importés n’est pas disponible dans cette version. Aucun document n’est ouvert, lu ou envoyé. La démonstration utilise le contrat fictif déjà chargé.",
    );
  }

  function finish() {
    if (finished.current) return;
    finished.current = true;
    completeAnalysis();
    router.push("/analyse");
  }

  function start() {
    if (!ready || running) return;
    finished.current = false;
    setRunning(true);
    setStep(1);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      finish();
      return;
    }

    let current = 1;
    const tick = () => {
      if (current >= readingSteps.length) {
        finish();
        return;
      }
      current += 1;
      setStep(current);
      timer.current = window.setTimeout(tick, 720);
    };
    timer.current = window.setTimeout(tick, 720);
  }

  const progress = running ? Math.round((step / readingSteps.length) * 100) : 0;

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardDescription>
            {vendor.name} · {vendor.city} · {contract.reference}
          </CardDescription>
          <CardTitle className="text-lg">{contract.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <p className="text-sm leading-6 text-muted-foreground">{contract.description}</p>

          <div
            className="rounded-2xl border border-dashed border-border bg-muted/70 px-4 py-5"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              explainImport();
            }}
          >
            <div className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-card text-turquoise ring-1 ring-foreground/10">
                <Upload aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="font-medium text-foreground">Importer un PDF</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  L’analyse de fichiers importés n’est pas disponible dans cette version. Ne
                  déposez pas de document confidentiel : aucun fichier n’est lu.
                </p>
              </div>
            </div>
            <Button type="button" variant="outline" className="mt-4" onClick={explainImport}>
              Pourquoi aucun fichier n’est demandé
            </Button>
            {importMessage ? (
              <p role="status" className="mt-3 text-sm leading-6 text-foreground">
                {importMessage}
              </p>
            ) : null}
          </div>

          {ready ? (
            <details className="rounded-2xl bg-muted/50 px-4 py-3">
              <summary className="cursor-pointer text-sm font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-turquoise">
                Lire les 7 articles avant la lecture simulée
              </summary>
              <ol className="mt-4 flex flex-col gap-4">
                {clauses.map((clause) => (
                  <li key={clause.id}>
                    <p className="text-sm font-medium text-foreground">
                      {clause.reference} — {clause.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{clause.text}</p>
                  </li>
                ))}
              </ol>
            </details>
          ) : (
            <div className="rounded-2xl bg-missing-bg px-4 py-3 text-sm leading-6 text-missing">
              <p className="font-medium">Texte non chargé pour ce contrat</p>
              <p className="mt-1">
                Ce contrat est bien au dossier de l’entreprise. Son texte n’est pas chargé ici,
                pour ne pas inventer de garanties. La lecture disponible est celle de CloudNova AI.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-3 bg-card"
                onClick={() => selectContract(DEMO_CONTRACT_ID)}
              >
                Utiliser le contrat CloudNova AI
              </Button>
            </div>
          )}

          {ready && running ? (
            <div aria-live="polite" aria-busy="true" className="flex flex-col gap-3">
              <Progress value={progress} aria-label="Progression de la lecture simulée">
                <div className="flex w-full items-baseline justify-between gap-3">
                  <ProgressLabel className="text-foreground">
                    {readingSteps[Math.max(0, step - 1)]}
                  </ProgressLabel>
                  <ProgressValue />
                </div>
              </Progress>
              <ol className="flex flex-col gap-2">
                {readingSteps.map((label, index) => {
                  const position = index + 1;
                  const done = step > position;
                  const current = step === position;
                  return (
                    <li key={label} className="flex items-center gap-2 text-sm">
                      <span
                        className={cn(
                          "grid size-5 place-items-center rounded-full text-[11px]",
                          done || current
                            ? "bg-night text-turquoise-bright"
                            : "bg-muted text-muted-foreground",
                        )}
                        aria-hidden="true"
                      >
                        {done ? <Check className="size-3" /> : position}
                      </span>
                      <span className={current ? "font-medium text-foreground" : "text-muted-foreground"}>
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          ) : null}

          {ready ? (
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button type="button" size="lg" onClick={start} disabled={running}>
                {running ? "Lecture en cours" : "Lancer l’analyse de démonstration"}
              </Button>
              {analysisComplete && !running ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/analyse")}
                >
                  Voir le résultat
                </Button>
              ) : null}
            </div>
          ) : null}

          <Disclaimer />
        </CardContent>
      </Card>
    </div>
  );
}
