"use client"

import { cdn } from "@/utils/cdn"
import Image from "next/image"
import { ContactForm } from "./ContactForm"
import { useTitleContext } from "@/contexts/TitleContext"

type HeroContactProps = {
  gestorData?: {
    gestor: string;
    email: string;
    whatsapp: string;
    message: string;
  };
  tratamiento?: string;
  sede?: string;
};

export const HeroContact = ({ gestorData, tratamiento, sede }: HeroContactProps) => {
  const { justClaimedPrize } = useTitleContext();
  
  // Títulos dinámicos basados en si se reclamó el premio
  const displayTitle = justClaimedPrize 
    ? "¡Felicidades! 🎉" 
    : "¿Sientes que ya no tienes las erecciones de antes?";
  
  const displaySubtitle = justClaimedPrize 
    ? "Has ganado una consulta gratuita" 
    : "No es tu culpa. Y sí tiene solución.";
  return (
    <div className="bg-in-cyan pb-12 md:pb-24 lg:pb-32">
        <section className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 mb-8 gap-0 lg:mb-0 lg:grid-cols-12 items-center lg:gap-4 gap-y-8">
                <Image 
                    src={cdn("/campanas/disfuncion/assets/images/sections/header/ondas-de-choque-device.png")}
                    alt="Ondas de choque dispositivo"
                    width={100}
                    height={100}
                    className="w-60 hidden lg:block -rotate-12 md:max-w-none lg:col-start-1 lg:col-end-4 lg:justify-self-end -mb-6"
                    quality={100}
                    priority    
                />
                <div className="col-span-full md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-2 lg:col-start-4 lg:col-end-10 space-y-2 md:space-y-0">
                    <h1 className="font-in-nunito text-center md:text-left font-black md:font-in-poppins lg:text-center text-2xl md:text-3xl lg:text-3xl text-in-cyan-base md:font-semibold px-4 md:px-0">
                        {displayTitle}
                    </h1>
                    <p className="font-in-poppins text-center md:text-left lg:text-center text-lg lg:text-2xl xl:text-3xl font-semibold text-in-blue">{displaySubtitle}</p>
                </div>
                <Image 
                    src={cdn("/campanas/disfuncion/assets/images/sections/header/disfuncion-malestar-gente.png")}
                    alt="Ondas de choque dispositivo"
                    width={100}
                    height={100}
                    className="w-60 md:max-w-none lg:col-start-10 lg:col-end-13 justify-self-center md:col-start-3 md:row-start-1 md:justify-self-end lg:mb-6"
                    quality={100}
                    priority
                />
            </div>
        </section>
        <ContactForm 
          gestorData={gestorData}
          tratamiento={tratamiento}
          sede={sede}
        />
    </div>
  )
}
