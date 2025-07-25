import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { NavigationSection } from "@/app/components/NavigationSection";
import { surData } from "@/data/sedes/sur";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `Insalud ${surData.name}`,
  description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
  keywords: "centro médico, hospital, servicios médicos, especialistas médicos, atención médica especializada, urologia, vph, verruga, disfunción eréctil, prostatitis, ondas de choque",
  authors: [{ name: `Insalud ${surData.name}` }],
  creator: `Insalud ${surData.name}`,
  publisher: `Insalud ${surData.name}`,
  robots: "index, follow",
  openGraph: {
    title: `Insalud ${surData.name}`,
    description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
    type: "website",
    locale: "es_PE",
    siteName: `Insalud ${surData.name}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Insalud ${surData.name}`,
    description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
  },
};

export default function SurLayout({
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
        <NavigationSection 
          sede={surData.name} 
          srcLogo={'/shared/logos/insalud-sede-sur.svg'} 
        />
        {children}

      </body>
    </html>
  );
} 