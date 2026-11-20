import type { Metadata, Viewport } from "next";
import { PilotTallyEmbed } from "@/components/pilot-tally-embed";
import { pilotLegal, resolveTallyEmbedUrl } from "@/lib/pilot-config";

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
  const rawUrl = process.env.TALLY_FORM_URL;
  const embedSrc = resolveTallyEmbedUrl(rawUrl);
  const invalidUrl = Boolean(rawUrl?.trim()) && !embedSrc;

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
          className="rounded-2xl bg-white px-4 py-4 ring-1 ring-[#D8CBB8] sm:px-5"
        >
          <h2 id="demande-titre" className="text-lg leading-snug font-semibold tracking-tight">
            Demander une démonstration gratuite, sans engagement
          </h2>
          <div className="mt-3">
            {embedSrc ? <PilotTallyEmbed src={embedSrc} /> : <FormConfigNotice invalid={invalidUrl} />}
          </div>
        </section>

        <section aria-labelledby="confidentialite-titre" className="text-sm leading-6 text-[#5C5C5C]">
          <h2 id="confidentialite-titre" className="text-base font-medium text-[#2E2E2E]">
            Confidentialité
          </h2>
          <p className="mt-1">
            Les coordonnées transmises servent uniquement à répondre aux demandes liées au programme
            pilote.
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

function FormConfigNotice({ invalid }: { invalid: boolean }) {
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev) {
    return (
      <p className="rounded-xl bg-[#FAF8F4] px-4 py-3 text-sm leading-6 text-[#2E2E2E] ring-1 ring-[#D8CBB8]">
        Le formulaire n’est pas encore disponible. Aucune demande n’est enregistrée.
      </p>
    );
  }

  return (
    <div className="rounded-xl bg-[#FAF8F4] px-4 py-3 text-sm leading-6 text-[#2E2E2E] ring-1 ring-[#D8CBB8]">
      <p className="font-semibold">Configuration requise</p>
      <p className="mt-1">
        {invalid
          ? "TALLY_FORM_URL ne contient pas un lien public Tally. Aucune demande n’est enregistrée."
          : "TALLY_FORM_URL est absente. Aucune demande n’est enregistrée."}
      </p>
      <ol className="mt-2 list-decimal space-y-1 pl-5">
        <li>
          Créez un formulaire Tally gratuit : nom et prénom, nom de l’entreprise, adresse e-mail
          professionnelle, type de demande (Démonstration, Participation aux tests, Recevoir des
          informations).
        </li>
        <li>Copiez le lien public, de la forme https://tally.so/r/…</li>
        <li>
          À la racine du projet, dans <code className="text-[13px]">.env.local</code> :
          <code className="mt-1 block overflow-x-auto rounded-lg bg-white px-2 py-1 text-[13px] ring-1 ring-[#D8CBB8]">
            TALLY_FORM_URL=https://tally.so/r/votreIdentifiant
          </code>
        </li>
        <li>Relancez le serveur de développement.</li>
      </ol>
    </div>
  );
}
