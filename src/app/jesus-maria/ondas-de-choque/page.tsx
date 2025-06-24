import { TestimonialBubbles } from "../../components/TestimonialBubbles";
import { Treatment } from "../../components/Treatment/Treatment";
import { AboutDevice } from "../../components/AboutDevice";
import { AppointmentCta } from "../../components/AppointmentCta";
import { Questions } from "../../components/Questions";
import { HeroContact } from "../../components/hero-2/HeroContact";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { questionDisfuncion } from "@/data/questions/questionDisfuncion";
import { jesusMariaData } from "@/data/sedes/jesus-maria";
import { Footer } from "@/app/components/Footer";

export default function DisfuncionJesusMaria() {
    return (
        <>
            {/* Hero Section */}
            <HeroContact />
            
            {/* Testimonios Section */}
            <section id="testimonios">
                <TestimonialBubbles 
                    titleWithColors="La {cyan}disfunción eréctil{/cyan} no solo afecta tu cuerpo. Afecta cómo te {cyan}ves a ti mismo{/cyan}"
                    messages={[
                        "Puede aparecer desde los 30s y empeorar con el tiempo si no se trata.",
                        "No siempre es por estrés o edad. Muchas veces es un problema vascular.",
                        "Las pastillas son temporales. Este tratamiento reactiva el flujo real."
                    ]}
                />
            </section>
            
            {/* Tratamiento Section */}
            <section id="beneficios">
                <Treatment 
                    titleWithColors="¿Por qué tratarse con {cyan}Ondas de Choque?{/cyan}"
                    subtitle="Descubre los beneficios de esta tecnología de vanguardia."
                    cards={[
                        {
                            title: "Seguro y efectivo",
                            description: "No invasivo y sin efectos secundarios",
                            image: "/campanas/vph-jesus-maria/assets/images/sections/main/icon-seguro.png",
                            alt: "Seguro y efectivo"
                        },
                        {
                            title: "Sin dolor",
                            description: "Tecnología de última generación que minimiza molestias.",
                            image: "/campanas/vph-jesus-maria/assets/images/sections/main/icon-sin-dolor.png",
                            alt: "Sin dolor"
                        },
                        {
                            title: "Rápido retorno",
                            description: "Vuelve a tu rutina al instante.",
                            image: "/campanas/vph-jesus-maria/assets/images/sections/main/icon-rapido.png",
                            alt: "Rápido retorno"
                        },
                        {
                            title: "Resultados visibles",
                            description: "Mejora la erección de forma natural y progresiva.",
                            image: "/campanas/vph-jesus-maria/assets/images/sections/main/icon-resultados.png",
                            alt: "Resultados visibles"
                        }
                    ]}
                />
            </section>
            
            {/* Tecnología Section */}
            <section id="tecnologia">
                <AboutDevice 
                    titleWithColors="Equipos{blue} que estimulan la {/blue}circulación sanguínea {blue} y promueve erecciones más firmes y duraderas.{/blue}"
                    multipleImages={false}
                    srcDesktop={"/campanas/disfuncion/assets/images/sections/main/disfuncion-device.png"}
                    alt="Dispositivo de disfunción eréctil"
                />
            </section>
            
            {/* Call to Action */}
            <AppointmentCta 
                title="Recupera tu confianza con Ondas de Choque de Alta Frecuencia, un tratamiento no invasivo y clínicamente probado para mejorar la erección de forma natural y duradera."
                description="Nuestro equipo de especialistas está listo para ayudarte a dar el primer paso hacia tu bienestar."
                titleMobile="Recupera tu confianza con un tratamiento clínico eficaz y personalizado"
                whatsappNumber={jesusMariaData.landings.ondasChoque.whatsapp}
                whatsappMessage={jesusMariaData.landings.ondasChoque.message}
            />
            
            {/* Preguntas Section */}
            <section id="preguntas">
                <Questions questions={questionDisfuncion} />
            </section>
            
            {/* WhatsApp Flotante */}
            <FloatingWhatsApp 
                phoneNumber={jesusMariaData.landings.ondasChoque.whatsapp}
                message={jesusMariaData.landings.ondasChoque.message}
                tooltipText="¿Dudas sobre disfunción eréctil?"
            />
                          <Footer
          address={jesusMariaData.address}
          phone={jesusMariaData.landings.ondasChoque.whatsapp}
          email={jesusMariaData.email}
          socials={jesusMariaData.socials}
        />
        </>
    )
} 