import type { Metadata } from "next";
import { projectJournals } from "@/data/project-journal";
import JournalIndex from "@/components/journal/JournalIndex";
import { journalIndexMetadata } from "@/components/journal/journal-metadata";

type Props = { params: Promise<{ project: string }> };

export function generateStaticParams() {
  return [...new Set(projectJournals.map(({ project }) => project))].map((project) => ({ project }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return journalIndexMetadata((await params).project, "en");
}

export default async function JournalIndexPage({ params }: Props) {
  return <JournalIndex project={(await params).project} locale="en" />;
}
