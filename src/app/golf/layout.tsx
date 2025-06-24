import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { NavigationSection } from "@/app/components/NavigationSection";
import { golfData } from "@/data/sedes/golf";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `Insalud ${golfData.name}`,
  description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
  keywords: "centro médico, hospital, servicios médicos, especialistas médicos, atención médica especializada, urologia, vph, verruga, disfunción eréctil, prostatitis, ondas de choque",
  authors: [{ name: `Insalud ${golfData.name}` }],
  creator: `Insalud ${golfData.name}`,
  publisher: `Insalud ${golfData.name}`,
  robots: "index, follow",
  openGraph: {
    title: `Insalud ${golfData.name}`,
    description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
    type: "website",
    locale: "es_PE",
    siteName: `Insalud ${golfData.name}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Insalud ${golfData.name}`,
    description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
  },
};

export default function GolfLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`antialiased`}
        suppressHydrationWarning
      >
        <NavigationSection sede={golfData.name} srcLogo={'/shared/logos/insalud-sede-golf.svg'} />
        {children}

      </body>
    </html>
  );
} 