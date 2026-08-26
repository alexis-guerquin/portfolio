import type { Metadata } from "next";
import Script from "next/script";
import { siteUrl } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alexis Guerquin — Product Designer & Développeur freelance",
    template: "%s | Alexis Guerquin",
  },
  description: "Portfolio d’Alexis Guerquin, Product Designer et développeur freelance. Découvrez ses projets web, mobile, SaaS et ses expertises UX/UI.",
  keywords: ["Alexis Guerquin", "Product Designer", "UX/UI Designer", "développeur freelance", "développeur web", "SwiftUI", "portfolio"],
  authors: [{ name: "Alexis Guerquin", url: siteUrl }],
  creator: "Alexis Guerquin",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Alexis Guerquin",
    title: "Alexis Guerquin — Product Designer & Développeur freelance",
    description: "Portfolio, projets web et mobile, UX/UI et développement.",
    images: [{ url: "/1739529957561.jpeg", width: 1200, height: 1200, alt: "Alexis Guerquin" }],
  },
  twitter: { card: "summary_large_image", title: "Alexis Guerquin — Product Designer & Développeur freelance", description: "Portfolio, projets web et mobile, UX/UI et développement.", images: ["/1739529957561.jpeg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alexis Guerquin",
    url: siteUrl,
    image: `${siteUrl}/1739529957561.jpeg`,
    jobTitle: "Product Designer & Développeur freelance",
    sameAs: ["https://www.linkedin.com/in/alexis-guerquin/"],
    knowsAbout: ["UX/UI", "Product Design", "Développement web", "Next.js", "SwiftUI", "iOS"],
  };
  return (
    <html lang="fr">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <Script
          async
          src="https://webful.fr/tracking/webful-track.js"
          data-site-id="WBF-89967"
          data-api-key="b4d08bae54a2d172a25de2e10e43c23bf8192281bc5c60ad70e1891e181eafa1"
          data-base-url="https://webful.fr"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
