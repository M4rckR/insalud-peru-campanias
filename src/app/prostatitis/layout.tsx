import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { NavigationSection } from "@/app/components/NavigationSection";
import { Footer } from "../components/Footer";


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Insalud Prostatitis Jesus Maria",
  description: "Tratamiento avanzado para prostatitis con Ondas de Choque de Alta Frecuencia. Recupera tu bienestar de forma natural y duradera.",
  keywords: "prostatitis, tratamiento, ondas de choque, urología, salud sexual, Jesus Maria, Lima, Perú",
  authors: [{ name: "Insalud Prostatitis Jesus Maria" }],
  creator: "Insalud Prostatitis Jesus Maria",
  publisher: "Insalud Prostatitis Jesus Maria",
  robots: "index, follow",
  openGraph: {
    title: "Insalud Prostatitis Jesus Maria",
    description: "Tratamiento avanzado para prostatitis con Ondas de Choque de Alta Frecuencia. Recupera tu bienestar de forma natural y duradera.",
    type: "website",
    locale: "es_PE",
    siteName: "Insalud Prostatitis Jesus Maria",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insalud Prostatitis Jesus Maria",
  },
  alternates: {
    canonical: "https://app.insalud.pe/prostatitis",
  },
};

export default function RootLayout({
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
        <NavigationSection />
        {children}
        <Footer
            address="Av. José C. Mariátegui Mz J • Lote 27, San Juan de Miraflores 15801"
            phone="957 016 498"
            email="contacto.citas@insalud.pe"
            socials={{
                instagram: "https://www.instagram.com/insalud.sedequito?igsh=YThkMDh3eXQ5d3Q4",
                tiktok: "https://www.tiktok.com/@insaludquito?_t=ZM-8vfZK2TtAhS&_r=1",
                facebook: "https://www.facebook.com/share/15xS3Z6y8C/?mibextid=wwXIfr"
            }}
          />
      </body>
    </html>
  );
} 
