/**
 * Informations à remplacer par des données réelles avant publication.
 * Tant qu’une valeur est vide, la page affiche « non renseigné ».
 */
export const pilotLegal = {
  contactAddress: "",
  controllerName: "",
  retention: "",
};

const EMBED_OPTIONS = {
  alignLeft: "1",
  hideTitle: "1",
  transparentBackground: "1",
  dynamicHeight: "1",
} as const;

export function resolveTallyEmbedUrl(raw: string | undefined): string | null {
  if (!raw?.trim()) return null;

  const extracted =
    raw.match(/https:\/\/(?:www\.)?tally\.so\/(?:r|embed)\/[A-Za-z0-9]+/)?.[0] ?? raw.trim();

  let url: URL;
  try {
    url = new URL(extracted);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "");
  if (url.protocol !== "https:" || host !== "tally.so") return null;

  const segments = url.pathname.split("/").filter(Boolean);
  if (segments.length !== 2) return null;

  const [kind, id] = segments;
  if ((kind !== "r" && kind !== "embed") || !/^[A-Za-z0-9]{4,32}$/.test(id)) return null;

  const embed = new URL(`https://tally.so/embed/${id}`);
  for (const [key, value] of Object.entries(EMBED_OPTIONS)) {
    embed.searchParams.set(key, value);
  }
  return embed.toString();
}
