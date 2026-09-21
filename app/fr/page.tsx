import type { Metadata } from "next";
import Home from "@/components/Home";

export const metadata: Metadata = {
  title: "Alexis Guerquin — Product Designer & Développeur freelance",
  description: "Portfolio d’Alexis Guerquin, Product Designer et développeur freelance. Découvrez ses projets web, mobile, SaaS et ses expertises UX/UI.",
  alternates: { canonical: "/fr" },
  openGraph: { locale: "fr_FR", url: "https://alexis-guerquin.fr/fr" },
};

export default function FrenchPage() {
  return <Home initialLocale="fr" />;
}
