import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { NavigationSection } from "@/app/components/NavigationSection";
import { Footer } from "../components/Footer";


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Insalud Disfunción Eréctil Jesus Maria",
  description: "Tratamiento avanzado para disfunción eréctil con Ondas de Choque de Alta Frecuencia. Recupera tu confianza de forma natural y duradera.",
  keywords: "disfunción eréctil, tratamiento, ondas de choque, urología, salud sexual, Jesus Maria, Lima, Perú",
  authors: [{ name: "Insalud Disfunción Jesus Maria" }],
  creator: "Insalud Disfunción Jesus Maria",
  publisher: "Insalud Disfunción Jesus Maria",
  robots: "index, follow",
  openGraph: {
    title: "Insalud Disfunción Eréctil Jesus Maria",
    description: "Tratamiento avanzado para disfunción eréctil con Ondas de Choque de Alta Frecuencia. Recupera tu confianza de forma natural y duradera.",
    type: "website",
    locale: "es_PE",
    siteName: "Insalud Disfunción Jesus Maria",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insalud Disfunción Eréctil Jesus Maria",
    description: "Tratamiento avanzado para disfunción eréctil con Ondas de Choque de Alta Frecuencia. Recupera tu confianza de forma natural y duradera.",
  },
  alternates: {
    canonical: "https://app.insalud.pe/disfuncion-jm",
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
        <NavigationSection 
          links={[
            { label: "Beneficios", href: "#beneficios", isAnchor: true },
            { label: "Preguntas Frecuentes", href: "#preguntas", isAnchor: true },
          ]}
          socialLinks={{
            instagram: "https://www.instagram.com/insalud.disfuncion",
            tiktok: "https://www.tiktok.com/@insaluddisfuncion",
            facebook: "https://www.facebook.com/insaluddisfuncion"
          }}
        />
        {children}
        <Footer
            address="Av. José C. Mariátegui Mz J • Lote 27, San Juan de Miraflores 15801"
            phone="+593 99 424 2175"
            email="admision@insalud.ec"
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
