import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { NavigationSection } from "@/app/components/NavigationSection";
import { jesusMariaData } from "@/data/sedes/jesus-maria";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `Insalud ${jesusMariaData.name}`,
  description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
  keywords: "centro médico, hospital, servicios médicos, especialistas médicos, atención médica especializada, urologia, vph, verruga, disfunción eréctil, prostatitis, ondas de choque",
  authors: [{ name: `Insalud ${jesusMariaData.name}` }],
  creator: `Insalud ${jesusMariaData.name}`,
  publisher: `Insalud ${jesusMariaData.name}`,
  robots: "index, follow",
  openGraph: {
    title: `Insalud ${jesusMariaData.name}`,
    description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
    type: "website",
    locale: "es_PE",
    siteName: `Insalud ${jesusMariaData.name}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Insalud ${jesusMariaData.name}`,
    description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
  },
};

export default function JesusMariLayout({
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
        <NavigationSection sede={jesusMariaData.name} 
          srcLogo={'/shared/logos/insalud-jesus-maria.svg'}
        />
        {children}

      </body>
    </html>
  );
} 