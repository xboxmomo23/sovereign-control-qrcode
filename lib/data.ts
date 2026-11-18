import type {
  Clause,
  ContractSummary,
  Finding,
  Section,
  ToolUsage,
  Vendor,
} from "@/lib/types";

export const DEMO_CONTRACT_ID = "cloudnova";

export const REPORT_HREF = `/rapport/${DEMO_CONTRACT_ID}`;

export const clientCompany = {
  name: "TechIndustrie",
  activity: "PME industrielle",
  employees: 50,
  contactName: "Thomas",
  contactRole: "Responsable informatique",
};

export const SIMULATION_NOTICE =
  "Analyse simulée sur document fictif – validation humaine nécessaire.";

export const usageLabel: Record<ToolUsage, string> = {
  utilise: "Utilisé",
  envisage: "Envisagé",
};

export const vendors: Vendor[] = [
  {
    id: "cloudnova",
    name: "CloudNova AI",
    activity: "Assistant d’intelligence artificielle",
    city: "Paris",
    usage: "utilise",
    situation: "Déjà en service pour les notes et synthèses",
  },
  {
    id: "eurodata",
    name: "EuroData Cloud",
    activity: "Stockage de fichiers",
    city: "Lyon",
    usage: "utilise",
    situation: "Déjà en service pour les archives de production",
  },
  {
    id: "atlas",
    name: "AtlasWorkspace",
    activity: "Collaboration d’équipe",
    city: "Nantes",
    usage: "utilise",
    situation: "Déjà en service pour les échanges internes",
  },
  {
    id: "nordstack",
    name: "NordStack",
    activity: "Hébergement d’applications",
    city: "Lille",
    usage: "envisage",
    situation: "À l’étude, sans engagement",
  },
];

export const contracts: ContractSummary[] = [
  {
    id: "cloudnova",
    vendorId: "cloudnova",
    title: "CloudNova AI – Conditions de traitement des données",
    reference: "SC-DEMO-2026-014",
    updatedLabel: "Texte fictif du 12 mars 2026",
    demoReady: true,
    description:
      "Conditions fictives de l’assistant déjà utilisé par TechIndustrie. Sept articles couvrent la propriété des contenus, l’assistance, l’hébergement, la suppression, les sous-traitants et la restitution.",
  },
  {
    id: "eurodata",
    vendorId: "eurodata",
    title: "EuroData Cloud – Conditions de stockage",
    reference: "SC-DEMO-2026-008",
    updatedLabel: "Signé le 20 janvier 2026",
    demoReady: false,
    description:
      "Contrat de stockage déjà signé par TechIndustrie. Son texte intégral n’est pas chargé dans cette maquette : aucune garantie n’est donc affichée.",
  },
  {
    id: "atlas",
    vendorId: "atlas",
    title: "AtlasWorkspace – Conditions de collaboration",
    reference: "SC-DEMO-2026-011",
    updatedLabel: "Signé le 4 février 2026",
    demoReady: false,
    description:
      "Contrat de collaboration déjà signé. Son texte intégral n’est pas chargé dans cette maquette : aucune garantie n’est donc affichée.",
  },
  {
    id: "nordstack",
    vendorId: "nordstack",
    title: "NordStack – Projet de conditions d’hébergement",
    reference: "SC-DEMO-2026-019",
    updatedLabel: "Projet du 2 mars 2026",
    demoReady: false,
    description:
      "Projet reçu pour un hébergement encore envisagé. Son texte intégral n’est pas chargé dans cette maquette : aucune garantie n’est donc affichée.",
  },
];

export const clauses: Clause[] = [
  {
    id: "a41",
    reference: "Article 4.1",
    title: "Propriété et usage des contenus",
    text: "Les données, fichiers, messages envoyés au service et résultats produits à partir des contenus du Client demeurent sa propriété exclusive. CloudNova AI s’interdit de les revendre, de les céder ou de les communiquer à des tiers à des fins commerciales. Ces contenus ne sont pas utilisés pour entraîner, affiner ou évaluer les modèles généraux proposés à d’autres clients.",
  },
  {
    id: "a51",
    reference: "Article 5.1",
    title: "Consultation pour l’assistance",
    text: "Seuls les employés autorisés de CloudNova AI peuvent consulter les données du Client, et seulement lorsqu’une demande d’assistance a été ouverte par le Client. Cette consultation prend fin à la clôture de la demande. Ces employés sont tenus au secret.",
  },
  {
    id: "a61",
    reference: "Article 6.1",
    title: "Lieu d’hébergement",
    text: "Les données du Client sont hébergées dans des centres situés en France (Île-de-France) et, en secours, en Allemagne (Francfort). Le service standard ne prévoit aucun transfert en dehors de l’Union européenne.",
  },
  {
    id: "a64",
    reference: "Article 6.4",
    title: "Accès depuis l’extérieur de l’Union européenne",
    text: "Si un incident majeur l’exige, CloudNova AI peut autoriser un accès distant temporaire par un expert situé hors de l’Union européenne. Les présentes conditions ne précisent ni la durée maximale de cet accès, ni les pays concernés, ni les garanties qui l’encadrent.",
  },
  {
    id: "a72",
    reference: "Article 7.2",
    title: "Suppression en fin de contrat",
    text: "À la date de fin du contrat, CloudNova AI supprime les données du Client dans un délai de trente (30) jours, sauf si une loi impose de les conserver. Sur demande écrite, une attestation de suppression est envoyée au Client.",
  },
  {
    id: "a81",
    reference: "Article 8.1",
    title: "Sous-traitants",
    text: "CloudNova AI peut faire appel à des sous-traitants pour l’hébergement des données et l’envoi de notifications. Leur liste figure en annexe A. Elle peut être modifiée avec un préavis de quinze (15) jours. Le contrat ne prévoit pas de droit d’opposition du Client.",
  },
  {
    id: "a91",
    reference: "Article 9.1",
    title: "Restitution des données",
    text: "Après la résiliation, et sur demande écrite, CloudNova AI remet un export des données au format JSON ainsi que les fichiers d’origine, dans un délai de quinze (15) jours ouvrés. Le prix éventuel de cet export n’est pas indiqué.",
  },
];

export const sections: Section[] = [
  {
    id: "confidentialite",
    title: "Confidentialité des données",
    lead: "Ce que le texte dit sur la propriété des contenus, leur usage et qui peut les consulter.",
  },
  {
    id: "localisation",
    title: "Localisation et transferts",
    lead: "Où les données sont annoncées, et quelle exception reste sans règles écrites.",
  },
  {
    id: "conservation",
    title: "Conservation",
    lead: "Ce qui est prévu à la fin du contrat, et ce qui n’est pas écrit pendant sa durée.",
  },
  {
    id: "sous-traitance",
    title: "Sous-traitance",
    lead: "Qui peut intervenir en plus de CloudNova AI, et ce que le client peut refuser.",
  },
  {
    id: "reversibilite",
    title: "Réversibilité",
    lead: "Comment les données sont rendues si le client part, et ce qui n’est pas prévu.",
  },
];

export const findings: Finding[] = [
  {
    id: "f-propriete",
    sectionId: "confidentialite",
    status: "garantie",
    title: "Les contenus restent au client",
    explanation:
      "Les données, les fichiers, les messages envoyés au service et les résultats restent la propriété du client. CloudNova AI s’interdit de les revendre, de les céder ou de les communiquer à des tiers pour en faire commerce.",
    clauseId: "a41",
  },
  {
    id: "f-entrainement",
    sectionId: "confidentialite",
    status: "garantie",
    title: "Pas d’entraînement des modèles généraux",
    explanation:
      "Ces contenus ne servent pas à entraîner, affiner ou évaluer les modèles généraux proposés aux autres clients. Le texte ne parle pas d’un modèle qui serait réservé à ce seul client.",
    clauseId: "a41",
  },
  {
    id: "f-assistance",
    sectionId: "confidentialite",
    status: "garantie",
    title: "Consultation limitée à l’assistance",
    explanation:
      "Un employé autorisé ne consulte les données que si le client a ouvert une demande d’assistance. La consultation s’arrête quand la demande est close, et l’employé est tenu au secret.",
    clauseId: "a51",
  },
  {
    id: "f-chiffrement",
    sectionId: "confidentialite",
    status: "absente",
    title: "Chiffrement non décrit",
    explanation:
      "Aucun des sept articles ne dit si les données sont chiffrées lorsqu’elles sont stockées ou transportées, ni qui détient les clés.",
    clauseId: null,
    question:
      "Où décrivez-vous le chiffrement des données stockées et transportées, et qui détient les clés ?",
  },
  {
    id: "f-hebergement",
    sectionId: "localisation",
    status: "garantie",
    title: "Hébergement en France, secours en Allemagne",
    explanation:
      "Le service standard héberge les données en Île-de-France, avec un secours à Francfort. Il ne prévoit pas de transfert en dehors de l’Union européenne.",
    clauseId: "a61",
  },
  {
    id: "f-expert",
    sectionId: "localisation",
    status: "clarifier",
    title: "Accès hors Union européenne sans cadre écrit",
    explanation:
      "En cas d’incident majeur, un expert situé hors de l’Union européenne peut accéder aux données à distance. La durée, les pays et les garanties de cet accès ne sont pas écrits.",
    clauseId: "a64",
    question:
      "Quelle est la durée maximale d’un accès hors Union européenne, depuis quels pays, et quelle trace en conservez-vous ?",
  },
  {
    id: "f-suppression",
    sectionId: "conservation",
    status: "garantie",
    title: "Suppression sous 30 jours",
    explanation:
      "À la fin du contrat, les données sont supprimées dans un délai de 30 jours, sauf si une loi impose de les garder. Une attestation est envoyée si le client la demande par écrit.",
    clauseId: "a72",
  },
  {
    id: "f-duree",
    sectionId: "conservation",
    status: "absente",
    title: "Durée de conservation pendant le contrat non écrite",
    explanation:
      "Le texte dit quand les données sont supprimées après la fin du contrat. Il ne dit pas combien de temps les messages, les sauvegardes et les journaux sont gardés tant que le contrat court.",
    clauseId: null,
    question:
      "Combien de temps les messages, les sauvegardes et les journaux sont-ils conservés tant que le contrat est en cours ?",
  },
  {
    id: "f-liste",
    sectionId: "sous-traitance",
    status: "garantie",
    title: "Sous-traitants listés, préavis de 15 jours",
    explanation:
      "Les sous-traitants servent à l’hébergement et à l’envoi de notifications. Leur liste est en annexe A et un changement est annoncé 15 jours avant.",
    clauseId: "a81",
  },
  {
    id: "f-opposition",
    sectionId: "sous-traitance",
    status: "clarifier",
    title: "Pas de droit d’opposition du client",
    explanation:
      "Le client est prévenu d’un nouveau sous-traitant, mais le contrat ne lui donne pas le droit de s’y opposer.",
    clauseId: "a81",
    question:
      "Le client peut-il refuser un nouveau sous-traitant annoncé quinze jours à l’avance, ou quitter le contrat sans frais si ce refus n’est pas accepté ?",
  },
  {
    id: "f-export",
    sectionId: "reversibilite",
    status: "garantie",
    title: "Export JSON sous 15 jours ouvrés",
    explanation:
      "Après la résiliation, sur demande écrite, CloudNova AI remet un export JSON et les fichiers d’origine dans un délai de 15 jours ouvrés.",
    clauseId: "a91",
  },
  {
    id: "f-prix",
    sectionId: "reversibilite",
    status: "clarifier",
    title: "Prix de l’export non indiqué",
    explanation:
      "La restitution est prévue, mais le contrat ne dit pas si l’export est inclus dans le prix ou facturé à part.",
    clauseId: "a91",
    question:
      "L’export prévu à l’article 9.1 est-il inclus dans le prix ? Pouvez-vous fournir un export d’essai avant engagement ?",
  },
  {
    id: "f-aide",
    sectionId: "reversibilite",
    status: "absente",
    title: "Aide au changement de fournisseur non prévue",
    explanation:
      "Aucun article ne prévoit d’accompagnement, ni une période où l’ancien et le nouveau service fonctionneraient ensemble, ni la remise des réglages du service.",
    clauseId: null,
    question:
      "Prévoyez-vous une aide au changement de fournisseur, par exemple un accompagnement ou une période où les deux services fonctionnent ensemble ?",
  },
];

export const executiveSummary: string[] = [
  "Dans ce contrat fictif, les données, les messages et les résultats restent la propriété du client. CloudNova AI s’interdit de les revendre et de les utiliser pour entraîner les modèles généraux proposés à d’autres clients. Un employé ne les consulte que pendant une demande d’assistance ouverte par le client.",
  "L’hébergement annoncé est en France, avec un secours en Allemagne, et le service standard ne prévoit pas de transfert hors de l’Union européenne. À la fin du contrat, les données sont supprimées sous 30 jours, sauf obligation légale, et une attestation peut être demandée. Un export JSON et les fichiers d’origine sont prévus sous 15 jours ouvrés. Les sous-traitants, limités à l’hébergement et aux notifications, sont listés avec un préavis de 15 jours.",
  "Trois formulations restent à éclaircir avec le fournisseur : un expert hors Union européenne peut accéder aux données sans durée, pays ni garantie écrits ; le client ne peut pas s’opposer à un nouveau sous-traitant ; le prix de l’export n’est pas indiqué. Trois sujets ne sont pas écrits du tout : le chiffrement, la durée de conservation pendant le contrat, et l’aide au changement de fournisseur.",
];

export const scopeNote =
  "Ce texte fictif porte uniquement sur le traitement des données. Il ne décrit ni le prix de l’abonnement, ni la disponibilité du service, ni les responsabilités en cas de panne. Ces sujets ne sont pas comptés comme des informations absentes : ils sont hors du document présenté.";

export const preparationNote =
  "Cette maquette ne transmet aucun document et ne dépose pas de cookie de suivi. Une version réelle, avant tout dépôt de contrat, devra informer les personnes concernées, préciser la base légale et tenir un registre des traitements. Rien ici ne vaut mise en conformité ni conseil juridique.";

function assertDemoData() {
  const clauseIds = new Set(clauses.map((clause) => clause.id));
  if (clauses.length < 5 || clauses.length > 7) {
    throw new Error("Le contrat de démonstration doit contenir 5 à 7 clauses.");
  }

  const vendorIds = new Set(vendors.map((vendor) => vendor.id));
  for (const contract of contracts) {
    if (!vendorIds.has(contract.vendorId)) {
      throw new Error(`Contrat sans fournisseur : ${contract.id}`);
    }
  }

  if (contracts.filter((contract) => contract.demoReady).length !== 1) {
    throw new Error("Un seul contrat de démonstration doit être prêt.");
  }

  const ready = contracts.find((contract) => contract.demoReady);
  if (!ready || ready.id !== DEMO_CONTRACT_ID) {
    throw new Error("Le contrat prêt ne correspond pas à l’identifiant de démonstration.");
  }

  for (const finding of findings) {
    if (!sections.some((section) => section.id === finding.sectionId)) {
      throw new Error(`Section inconnue pour ${finding.id}`);
    }
    if (finding.status === "absente") {
      if (finding.clauseId !== null) {
        throw new Error(`${finding.id} est absente mais cite une clause.`);
      }
      if (!finding.question) {
        throw new Error(`${finding.id} n’a pas de question.`);
      }
    } else if (!finding.clauseId || !clauseIds.has(finding.clauseId)) {
      throw new Error(`${finding.id} ne correspond à aucune clause.`);
    } else if (finding.status === "clarifier" && !finding.question) {
      throw new Error(`${finding.id} n’a pas de question.`);
    }
  }
}

assertDemoData();

export const counts = {
  tools: vendors.length,
  used: vendors.filter((vendor) => vendor.usage === "utilise").length,
  considered: vendors.filter((vendor) => vendor.usage === "envisage").length,
  contracts: contracts.length,
  garantie: findings.filter((finding) => finding.status === "garantie").length,
  clarifier: findings.filter((finding) => finding.status === "clarifier").length,
  absente: findings.filter((finding) => finding.status === "absente").length,
};

export const clauseRollCall = clauses
  .map((clause) => clause.reference.replace("Article ", ""))
  .join(", ")
  .replace(/, ([^,]+)$/, " et $1");

export function getVendor(id: string) {
  const vendor = vendors.find((item) => item.id === id);
  if (!vendor) {
    throw new Error(`Fournisseur fictif introuvable : ${id}`);
  }
  return vendor;
}

export function getContract(id: string) {
  return contracts.find((contract) => contract.id === id) ?? contracts[0];
}

export function contractIsAnalyzed(contractId: string, analysisComplete: boolean) {
  return analysisComplete && contractId === DEMO_CONTRACT_ID;
}

export function verificationLabel(contractId: string, analysisComplete: boolean) {
  const contract = contracts.find((item) => item.id === contractId);
  if (contract?.demoReady && analysisComplete) return "Lecture simulée";
  if (contract?.demoReady) return "Texte prêt, non analysé";
  return "Suivi sans analyse";
}

export function getClause(id: string) {
  return clauses.find((clause) => clause.id === id) ?? null;
}

export function findingsFor(sectionId: Section["id"]) {
  return findings.filter((finding) => finding.sectionId === sectionId);
}

export function findingReference(finding: Finding) {
  if (!finding.clauseId) return "Aucune clause";
  return getClause(finding.clauseId)?.reference ?? "Aucune clause";
}

export const readingSteps = [
  "Ouverture du texte fictif préchargé",
  "Repérage des sept articles",
  "Classement : garantie, point à clarifier, information absente",
  "Préparation du résumé pour un dirigeant",
];
