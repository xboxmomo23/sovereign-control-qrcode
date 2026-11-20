import type { Metadata, Viewport } from "next";
import { PilotRequestForm } from "@/components/pilot-request-form";
import { pilotLegal } from "@/lib/pilot-config";

export const metadata: Metadata = {
  title: "Programme pilote",
  description:
    "Découvrez Sovereign Control et participez gratuitement aux premiers tests de notre prototype.",
};

export const viewport: Viewport = {
  themeColor: "#FAF8F4",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

const benefits = [
  "Comprendre les clauses importantes",
  "Identifier les points à clarifier",
  "Faciliter les choix de fournisseurs",
];

export default function DevenirPilotePage() {
  return (
    <div className="min-h-dvh bg-[#FAF8F4] text-[#2E2E2E]">
      <div className="h-1 bg-[#A8B8A5]" aria-hidden="true" />
      <main className="mx-auto flex w-full max-w-lg flex-col gap-5 px-[max(1.25rem,env(safe-area-inset-left))] pt-[max(1.75rem,env(safe-area-inset-top))] pr-[max(1.25rem,env(safe-area-inset-right))] pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:py-12">
        <p className="text-sm font-semibold tracking-tight">Sovereign Control</p>

        <header className="flex flex-col gap-3">
          <h1 className="text-[1.65rem] leading-tight font-semibold tracking-tight text-balance">
            Comprenez mieux les garanties de vos fournisseurs cloud et IA.
          </h1>
          <p className="text-base leading-6 text-[#5C5C5C]">
            Découvrez Sovereign Control et participez gratuitement aux premiers tests de notre
            prototype.
          </p>
          <p className="w-fit rounded-full bg-[#A8B8A5] px-3 py-1 text-sm font-medium">
            5 entreprises pilotes recherchées
          </p>
        </header>

        <ul className="flex flex-col gap-2.5 text-[15px] leading-5">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3">
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#A8B8A5]" aria-hidden="true" />
              {benefit}
            </li>
          ))}
        </ul>

        <p className="text-sm leading-5 text-[#5C5C5C]">
          Prototype interactif avec analyses simulées sur des contrats fictifs.
        </p>

        <section
          aria-labelledby="demande-titre"
          className="relative rounded-2xl bg-white px-4 py-4 ring-1 ring-[#D8CBB8] sm:px-5"
        >
          <h2 id="demande-titre" className="text-lg leading-snug font-semibold tracking-tight">
            Demander une démonstration gratuite, sans engagement
          </h2>
          <div className="mt-3">
            <PilotRequestForm />
          </div>
        </section>

        <section aria-labelledby="confidentialite-titre" className="text-sm leading-6 text-[#5C5C5C]">
          <h2 id="confidentialite-titre" className="text-base font-medium text-[#2E2E2E]">
            Confidentialité
          </h2>
          <p className="mt-1">
            Les données transmises sont utilisées uniquement pour répondre aux demandes liées à
            Sovereign Control.
          </p>
          <dl className="mt-3 space-y-1">
            <div>
              <dt className="inline font-medium text-[#2E2E2E]">Adresse de contact : </dt>
              <dd className="inline">
                <LegalValue value={pilotLegal.contactAddress} emptyLabel="non renseignée" />
              </dd>
            </div>
            <div>
              <dt className="inline font-medium text-[#2E2E2E]">Responsable du traitement : </dt>
              <dd className="inline">
                <LegalValue value={pilotLegal.controllerName} emptyLabel="non renseigné" />
              </dd>
            </div>
            <div>
              <dt className="inline font-medium text-[#2E2E2E]">Durée de conservation : </dt>
              <dd className="inline">
                <LegalValue value={pilotLegal.retention} emptyLabel="non renseignée" />
              </dd>
            </div>
          </dl>
        </section>
      </main>
    </div>
  );
}

function LegalValue({ value, emptyLabel }: { value: string; emptyLabel: string }) {
  const trimmed = value.trim();
  if (!trimmed) return <span>{emptyLabel}</span>;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return (
      <a href={`mailto:${trimmed}`} className="text-[#2E2E2E] underline decoration-[#A8B8A5] underline-offset-4">
        {trimmed}
      </a>
    );
  }
  return <span className="text-[#2E2E2E]">{trimmed}</span>;
}
