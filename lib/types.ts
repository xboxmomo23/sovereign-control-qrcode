export type FindingStatus = "garantie" | "clarifier" | "absente";

export type SectionId =
  | "confidentialite"
  | "localisation"
  | "conservation"
  | "sous-traitance"
  | "reversibilite";

export type ToolUsage = "utilise" | "envisage";

export type Vendor = {
  id: string;
  name: string;
  activity: string;
  city: string;
  usage: ToolUsage;
  situation: string;
};

export type ContractSummary = {
  id: string;
  vendorId: string;
  title: string;
  reference: string;
  updatedLabel: string;
  demoReady: boolean;
  description: string;
};

export type Clause = {
  id: string;
  reference: string;
  title: string;
  text: string;
};

export type Section = {
  id: SectionId;
  title: string;
  lead: string;
};

export type Finding = {
  id: string;
  sectionId: SectionId;
  status: FindingStatus;
  title: string;
  explanation: string;
  clauseId: string | null;
  question?: string;
};
