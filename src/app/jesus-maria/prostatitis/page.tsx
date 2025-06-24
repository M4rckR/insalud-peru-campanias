import { TestimonialBubbles } from "../../components/TestimonialBubbles";
import { Treatment } from "../../components/Treatment/Treatment";
import { AboutDevice } from "../../components/AboutDevice";
import { Questions } from "../../components/Questions";
import { AppointmentCta } from "../../components/AppointmentCta";
import { HeroContact } from "../../components/hero-1/HeroContact";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { questionProstatitis } from "@/data/questions/questionProstatitis";
import { jesusMariaData } from "@/data/sedes/jesus-maria";
import { Footer } from "@/app/components/Footer";

export default function ProstatitisJesusMaria() {
  return (
    <>
      <HeroContact  
        title="¿Tienes molestias al orinar o dolor persistente?"
        subtitle="Podrías tener prostatitis crónica y no saberlo."
        image="/campanas/prostatitis/assets/images/sections/header/hero-prostatitis.png"
        imageMobile="/campanas/prostatitis/assets/images/sections/header/hero-prostatitis.png"
        description="Agenda tu cita ahora y recupera tu calidad de vida con nuestro tratamiento avanzado con Ondas de Choque."
      />
      <TestimonialBubbles
        messages={[
          "El dolor pélvico, las molestias al orinar o disfunción eréctil suelen ser señales ignoradas.",
          "Los antibióticos no siempre funcionan y los síntomas pueden durar años.",
          "Afecta hasta al 15% de los hombres en edad adulta.",
        ]}
      />
      <section id="beneficios">
        <Treatment
          titleWithColors="¿Por qué tratarse con {cyan}Ondas de choque? {/cyan}"
          subtitle="Conoce los beneficios que te ofrece este tratamiento."
          cards={[
            {
              title: "Seguro y efectivo",
              description: "No invasivo y sin efectos secundarios",
              image:
                "/campanas/vph-jesus-maria/assets/images/sections/main/icon-seguro.png",
              alt: "Seguro y efectivo",
            },
            {
              title: "Sin dolor",
              description:
                "Tecnología de última generación que minimiza molestias.",
              image:
                "/campanas/vph-jesus-maria/assets/images/sections/main/icon-sin-dolor.png",
              alt: "Sin dolor",
            },
            {
              title: "Rápido retorno",
              description: "Vuelve a tu rutina al instante.",
              image:
                "/campanas/vph-jesus-maria/assets/images/sections/main/icon-rapido.png",
              alt: "Rápido retorno",
            },
            {
              title: "Resultados visibles",
              description:
                "Mejora la erección de forma natural y progresiva.",
              image:
                "/campanas/vph-jesus-maria/assets/images/sections/main/icon-resultados.png",
              alt: "Resultados visibles",
            },
          ]}
        />
      </section>
      <AboutDevice
           titleWithColors="Equipos {blue}profesionales de primer nivel y{/blue} Médicos especialistas {blue}certificados{/blue}"
          multipleImages={false}
          srcDesktop={"/campanas/disfuncion/assets/images/sections/main/disfuncion-device.png"}
          alt="Dispositivo de disfunción eréctil"
      />
      <AppointmentCta 
        title="Recupera tu calidad de vida con nuestro tratamiento avanzado con Ondas de Choque"
        description="Nuestro equipo de especialistas está listo para ayudarte a dar el primer paso hacia tu bienestar."
        titleMobile="Recupera tu calidad de vida con nuestro tratamiento avanzado con Ondas de Choque "
        whatsappNumber={jesusMariaData.landings.prostatitis.whatsapp}
        whatsappMessage={jesusMariaData.landings.prostatitis.message}
      />
      <Questions questions={questionProstatitis} />
      <FloatingWhatsApp
        phoneNumber={jesusMariaData.landings.prostatitis.whatsapp}
        message={jesusMariaData.landings.prostatitis.message}
        tooltipText="¡Conversemos por WhatsApp!"
      />
                    <Footer
          address={jesusMariaData.address}
          phone={jesusMariaData.landings.prostatitis.whatsapp}
          email={jesusMariaData.email}
          socials={jesusMariaData.socials}
        />
    </>
  );
} 