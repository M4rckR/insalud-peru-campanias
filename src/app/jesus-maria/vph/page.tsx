import { TestimonialBubbles } from "../../components/TestimonialBubbles";
import { Treatment } from "../../components/Treatment/Treatment";
import { AboutDevice } from "../../components/AboutDevice";
import { Questions } from "../../components/Questions";
import { AppointmentCta } from "../../components/AppointmentCta";
import { HeroContact } from "../../components/hero-1/HeroContact";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { questionVph } from "@/data/questions/questionVph";
import { jesusMariaData } from "@/data/sedes/jesus-maria";
import { Footer } from "@/app/components/Footer";

export default function VphJesusMaria() {
  return (
    <>
      <HeroContact 
        imageMobile="/campanas/vph-jesus-maria/assets/images/sections/header/grafico-vph-mobile.png"
        image="/campanas/vph-jesus-maria/assets/images/sections/header/hero-image.png"
        title="¿Tienes verrugas genitales? "
        subtitle="Podrías tener VPH y no saberlo"
        description="Agenda tu cita ahora y elimina las verrugas sin dañar tu piel."
        gestorData={jesusMariaData.landings.vph}
        tratamiento="VPH"
        sede="Jesús María"
      />
      <TestimonialBubbles
        messages={[
          "Puede aparecer desde los 30s y empeorar con el tiempo si no se trata.",
          "No siempre es por estrés o edad. Muchas veces es un problema vascular.",
          "Las pastillas son temporales. Este tratamiento reactiva el flujo real.",
        ]}
      />
      <section id="beneficios">
        <Treatment
          titleWithColors="¿Por qué tratarse con {cyan}Láser CO2?{/cyan}"
          subtitle="Conoce los beneficios que te ofrece este tratamiento."
          cards={[
            {
              title: "Seguro y efectivo",
              description: "Elimina las verrugas sin dañar la piel.",
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
                "Elimina las verrugas sin dañar tu piel desde la primera sesión.",
              image:
                "/campanas/vph-jesus-maria/assets/images/sections/main/icon-resultados.png",
              alt: "Resultados visibles",
            },
          ]}
        />
      </section>
      <AboutDevice
        titleWithColors="Equipos {blue}profesionales de primer nivel y{/blue} Médicos especialistas {blue}certificados{/blue}"
        multipleImages={true}
        srcDesktop={
          "/campanas/vph-jesus-maria/assets/images/sections/main/equipo-vph.png"
        }
        srcMobile={
          "/campanas/vph-jesus-maria/assets/images/sections/main/equipo-vph-mobile.png"
        }
        alt="Equipo médico láser CO2"
      />
      <AppointmentCta 
        title="Recupera tu confianza con un tratamiento clínico eficaz y personalizado"
        description="Nuestro equipo de especialistas está listo para ayudarte a dar el primer paso hacia tu bienestar."
        titleMobile="Recupera tu confianza con un tratamiento clínico eficaz y personalizado"
        whatsappNumber={jesusMariaData.landings.vph.whatsapp}
        whatsappMessage={jesusMariaData.landings.vph.message}
      />
      <Questions questions={questionVph} />
      <FloatingWhatsApp
        phoneNumber={jesusMariaData.landings.vph.whatsapp}
        message={jesusMariaData.landings.vph.message}
        tooltipText="¡Conversemos por WhatsApp!"
      />
              <Footer
          address={jesusMariaData.address}
          phone={jesusMariaData.landings.vph.whatsapp}
          email={jesusMariaData.email}
          socials={jesusMariaData.socials}
        />
    </>
  );
} 