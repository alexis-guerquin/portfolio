import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Home from "@/components/Home";
import { getProjectById, portfolio, siteUrl } from "@/data/site";

type Props = { params: Promise<{ project: string }> };

export function generateStaticParams() {
  return portfolio.map(({ id }) => ({ project: id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project: id } = await params;
  const project = getProjectById(id);
  if (!project) return {};
  const title = `${project.title} — Projet`;
  const description = project.tagline.fr;
  return {
    title,
    description,
    alternates: { canonical: `/${project.id}` },
    openGraph: { type: "website", locale: "fr_FR", url: `${siteUrl}/${project.id}`, title, description, images: [{ url: project.src, alt: project.alt }] },
    twitter: { card: "summary_large_image", title, description, images: [project.src] },
  };
}

export default async function ProjectModalPage({ params }: Props) {
  const { project: id } = await params;
  if (!getProjectById(id)) notFound();
  return <Home initialProjectId={id} />;
}
