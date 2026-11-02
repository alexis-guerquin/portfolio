import { journalFeed } from "@/lib/journal-feed";

export const dynamic = "force-static";
export const GET = () => journalFeed("fr");
