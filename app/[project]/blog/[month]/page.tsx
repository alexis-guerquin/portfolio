import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectJournal, projectJournals } from "@/data/project-journal";
import { getProjectById } from "@/data/site";
import JournalArticle from "@/components/journal/JournalArticle";
import { journalArticleMetadata } from "@/components/journal/journal-metadata";

type Props = { params: Promise<{ project: string; month: string }> };

export function generateStaticParams() {
  return projectJournals.map(({ project, slug }) => ({ project, month: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project, month } = await params;
  return journalArticleMetadata(project, month, "en");
}

export default async function JournalPage({ params }: Props) {
  const { project, month } = await params;
  const journal = getProjectJournal(project, month, "en");
  if (!journal || !getProjectById(project)) notFound();
  return <JournalArticle journal={journal} locale="en" />;
}
