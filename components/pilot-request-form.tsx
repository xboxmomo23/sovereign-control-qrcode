"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { pilotFormEndpoint } from "@/lib/pilot-config";

const REQUEST_TYPES = [
  "Demander une démonstration",
  "Participer aux tests pilotes",
  "Recevoir des informations",
] as const;

type FieldName = "name" | "company" | "email" | "requestType" | "message";

const LIMITS = {
  name: 120,
  company: 160,
  email: 160,
  message: 2000,
} as const;

const MIN_FILL_MS = 2000;

const fieldClass =
  "mt-1 w-full rounded-xl bg-[#FAF8F4] px-3 py-3 text-base text-[#2E2E2E] ring-1 ring-[#D8CBB8] outline-none focus:ring-2 focus:ring-[#A8B8A5]";

export function PilotRequestForm() {
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const openedAt = useRef<number | null>(null);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const requestType = String(data.get("requestType") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const honeypot = String(data.get("_gotcha") ?? "").trim();

    const nextErrors = validate({ name, company, email, requestType, message });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      setErrorMessage("");
      return;
    }

    const elapsed = openedAt.current === null ? 0 : Date.now() - openedAt.current;
    if (honeypot || elapsed < MIN_FILL_MS) {
      setStatus("error");
      setErrorMessage("La demande n’a pas pu être envoyée. Réessayez dans un instant.");
      return;
    }

    const endpoint = pilotFormEndpoint();
    if (!endpoint) {
      setStatus("error");
      setErrorMessage("La demande n’a pas pu être envoyée pour le moment.");
      return;
    }

    const payload = new FormData();
    payload.set("Nom et prénom", name);
    payload.set("Entreprise", company);
    payload.set("email", email);
    payload.set("Type de demande", requestType);
    if (message) payload.set("Message", message);
    payload.set("_subject", "Demande programme pilote Sovereign Control");
    payload.set("_gotcha", "");

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        setStatus("error");
        setErrorMessage("La demande n’a pas pu être envoyée. Réessayez dans un instant.");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("La demande n’a pas pu être envoyée. Réessayez dans un instant.");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="rounded-xl bg-[#FAF8F4] px-4 py-3 text-sm leading-6 text-[#2E2E2E] ring-1 ring-[#D8CBB8]">
        Votre demande a bien été envoyée. Une réponse vous sera adressée à l’adresse e-mail indiquée.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <Field label="Nom et prénom" name="name" error={errors.name} autoComplete="name" maxLength={LIMITS.name} />
      <Field label="Entreprise" name="company" error={errors.company} autoComplete="organization" maxLength={LIMITS.company} />
      <Field
        label="Adresse e-mail professionnelle"
        name="email"
        type="email"
        error={errors.email}
        autoComplete="email"
        inputMode="email"
        maxLength={LIMITS.email}
      />
      <div>
        <label htmlFor="requestType" className="text-sm font-medium">
          Type de demande
        </label>
        <select
          id="requestType"
          name="requestType"
          required
          defaultValue=""
          className={fieldClass}
          aria-invalid={Boolean(errors.requestType)}
          aria-describedby={errors.requestType ? "requestType-error" : undefined}
        >
          <option value="" disabled>
            Choisir
          </option>
          {REQUEST_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.requestType ? <FieldError id="requestType-error">{errors.requestType}</FieldError> : null}
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message complémentaire <span className="font-normal text-[#5C5C5C]">(facultatif)</span>
        </label>
        <textarea id="message" name="message" rows={3} maxLength={LIMITS.message} className={fieldClass} aria-invalid={Boolean(errors.message)} />
        {errors.message ? <FieldError id="message-error">{errors.message}</FieldError> : null}
      </div>
      <div className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" aria-hidden="true">
        <label>
          Ne pas remplir
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      {status === "error" ? (
        <p role="alert" className="text-sm leading-5 text-[#2E2E2E]">
          {errorMessage}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 w-full rounded-xl bg-[#2E2E2E] px-4 py-3 text-base font-medium text-[#FAF8F4] disabled:opacity-60"
      >
        {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}

function validate(values: Record<FieldName, string>) {
  const errors: Partial<Record<FieldName, string>> = {};
  if (values.name.length < 2) errors.name = "Indiquez votre nom et votre prénom.";
  else if (values.name.length > LIMITS.name) errors.name = "Ce nom est trop long.";
  if (values.company.length < 2) errors.company = "Indiquez le nom de l’entreprise.";
  else if (values.company.length > LIMITS.company) errors.company = "Ce nom d’entreprise est trop long.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > LIMITS.email) {
    errors.email = "Indiquez une adresse e-mail professionnelle valide.";
  }
  if (!REQUEST_TYPES.includes(values.requestType as (typeof REQUEST_TYPES)[number])) {
    errors.requestType = "Choisissez un type de demande.";
  }
  if (values.message.length > LIMITS.message) errors.message = "Le message est trop long.";
  return errors;
}

function Field({
  label,
  name,
  error,
  type = "text",
  autoComplete,
  inputMode,
  maxLength,
}: {
  label: string;
  name: FieldName;
  error?: string;
  type?: "text" | "email";
  autoComplete: string;
  inputMode?: "email";
  maxLength: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={fieldClass}
      />
      {error ? <FieldError id={`${name}-error`}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="mt-1 text-sm leading-5 text-[#2E2E2E]">
      {children}
    </p>
  );
}
