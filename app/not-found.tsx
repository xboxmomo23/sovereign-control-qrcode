import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[40vh] max-w-lg flex-col justify-center gap-3">
      <h1 className="text-2xl font-semibold tracking-tight">Cette page n’existe pas</h1>
      <p className="text-sm leading-6 text-muted-foreground">
        Le menu suffit pour le parcours de démonstration : tableau de bord, contrats, analyse et
        rapport.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex h-10 w-fit items-center rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground"
      >
        Retour au tableau de bord
      </Link>
    </div>
  );
}
