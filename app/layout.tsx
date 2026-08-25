import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alexis Guerquin Portfolio",
  description: "Portfolio d’Alexis Guerquin.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
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
