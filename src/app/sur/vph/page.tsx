import { TestimonialBubbles } from "../../components/TestimonialBubbles";
import { Treatment } from "../../components/Treatment/Treatment";
import { AboutDevice } from "../../components/AboutDevice";
import { Questions } from "../../components/Questions";
import { AppointmentCta } from "../../components/AppointmentCta";
import { HeroContact } from "../../components/hero-1/HeroContact";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { questionVph } from "@/data/questions/questionVph";
import { surData } from "@/data/sedes/sur";
import { Footer } from "@/app/components/Footer";
import { PageWrapper } from '@/components/ui/PageWrapper'
import { messagesVph } from "@/data/messages/messagesVph";

export default function VphSur() {
  return (
    <PageWrapper 
      sede="Sur" 
      tratamiento="VPH"
      spinWheelProps={{
        autoShowDelay: 1,
        spinDuration: 5,
        firstSpinAngle: 315,
        secondSpinAngle: 225,
        showCloseButton: false
      }}
    >
      <HeroContact  
        title="¿Tienes verrugas?"
        subtitle="Podrías tener VPH"
        image="/campanas/vph-jesus-maria/assets/images/sections/header/hero-image.png"
        imageMobile="/campanas/vph-jesus-maria/assets/images/sections/header/grafico-vph-mobile.png"
        description="Agenda tu cita ahora y elimina las verrugas con nuestro tratamiento avanzado con Cauterización."
        gestorData={surData.landings.vph}
        tratamiento="VPH"
        sede="Sur"
      />
      <TestimonialBubbles
        messages={messagesVph}
      />
      <section id="beneficios">
        <Treatment
          titleWithColors="¿Por qué tratarse con {cyan}Cauterización? {/cyan}"
          subtitle="Conoce los beneficios que te ofrece este tratamiento."
          cards={[
            {
              title: "Seguro y efectivo",
              description: "Procedimiento ambulatorio con alta efectividad",
              image:
                "/campanas/vph-jesus-maria/assets/images/sections/main/icon-seguro.png",
              alt: "Seguro y efectivo",
            },
            {
              title: "Sin dolor",
              description:
                "Anestesia local para mayor comodidad durante el procedimiento.",
              image:
                "/campanas/vph-jesus-maria/assets/images/sections/main/icon-sin-dolor.png",
              alt: "Sin dolor",
            },
            {
              title: "Rápido retorno",
              description: "Vuelve a tu rutina en pocos días.",
              image:
                "/campanas/vph-jesus-maria/assets/images/sections/main/icon-rapido.png",
              alt: "Rápido retorno",
            },
            {
              title: "Resultados visibles",
              description:
                "Eliminación inmediata de las verrugas visibles.",
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
          srcDesktop={"/campanas/vph-jesus-maria/assets/images/sections/main/vph-device.png"}
          alt="Dispositivo de cauterización VPH"
      />
      <AppointmentCta 
        title="Elimina las verrugas de forma segura y efectiva con nuestro tratamiento de Cauterización"
        description="Nuestro equipo de especialistas está listo para ayudarte a dar el primer paso hacia tu bienestar."
        titleMobile="Elimina las verrugas de forma segura y efectiva"
        whatsappNumber={surData.landings.vph.whatsapp}
        whatsappMessage={surData.landings.vph.message}
      />
      <Questions questions={questionVph} />
      <FloatingWhatsApp
        phoneNumber={surData.landings.vph.whatsapp}
        message={surData.landings.vph.message}
        tooltipText="¡Conversemos por WhatsApp!"
      />
            <Footer
          address={surData.address}
          phone={surData.landings.vph.whatsapp}
          email={surData.email}
          socials={surData.socials}
        />
    </PageWrapper>
  );
} 