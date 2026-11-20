/**
 * Informations à remplacer par des données réelles avant publication.
 * Tant qu’une valeur est vide, la page affiche « non renseigné ».
 * Ne pas y mettre une adresse e-mail personnelle.
 */
export const pilotLegal = {
  contactAddress: "",
  controllerName: "",
  retention: "",
};

/**
 * Identifiant public Formspree, visible dans le tableau de bord après création
 * du formulaire (partie finale de https://formspree.io/f/identifiant).
 * Ce n’est pas une clé secrète. L’adresse de réception se règle uniquement
 * dans ce tableau de bord, jamais dans ce dépôt.
 * Laisser vide tant que le formulaire n’existe pas : l’envoi échoue alors,
 * sans afficher de confirmation.
 */
export const FORMSPREE_FORM_ID = "";

export function pilotFormEndpoint(): string | null {
  if (!/^[A-Za-z0-9]{6,32}$/.test(FORMSPREE_FORM_ID)) return null;
  return `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
}
