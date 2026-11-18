import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard-view";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description:
    "Espace fictif de TechIndustrie : fournisseurs cloud et IA utilisés ou envisagés.",
};

export default function HomePage() {
  return <DashboardView />;
}
