import { cdn } from "@/utils/cdn"
import Image from "next/image"

type TestimonialBubblesProps = {
    title?: string;
    titleWithColors?: string; // Nuevo prop para títulos con colores
}

export const TestimonialBubbles = ({ title, titleWithColors }: TestimonialBubblesProps) => {
  
    // Función para renderizar el titulo con colores
  const renderTitleWithColors = (text: string) => {
    // Busca texto entre {cyan} y {/cyan} para color cyan
    // Busca texto entre {blue} y {/blue} para color azul
    const parts = text.split(/(\{cyan\}.*?\{\/cyan\}|\{blue\}.*?\{\/blue\})/g);
    
    return parts.map((part, index) => {
      if (part.includes('{cyan}')) {
        const cleanText = part.replace(/\{cyan\}|\{\/cyan\}/g, '');
        return <span key={index} className="text-in-cyan-base">{cleanText}</span>;
      } else if (part.includes('{blue}')) {
        const cleanText = part.replace(/\{blue\}|\{\/blue\}/g, '');
        return <span key={index} className="text-in-blue">{cleanText}</span>;
      } else {
        return <span key={index} className="text-in-blue">{part}</span>;
      }
    });
  };

  return (
    <div className="pb-8 hidden md:block">
        <div className="bg-in-blue-gradient-section">
            <section className="container relative max-w-5xl mx-auto px-4">
                {titleWithColors ? (
                    <h2 className="text-center text-4xl font-in-nunito font-bold max-w-[800px] mx-auto pb-12 md:pb-20">
                        {renderTitleWithColors(titleWithColors)}
                    </h2>
                ) : title ? (
                    <h2 className="text-in-blue text-center text-2xl font-in-nunito font-bold">{title}</h2>
                ) : null}
                <div className="flex flex-col text-in-blue pb-32 font-in-nunito">
                    <p className="self-start bg-in-blue-gradient py-4 px-6 rounded-md text-in-blue mb-8">
                        “1 de cada 2 personas sexualmente activas tendrá <strong>VPH</strong>  en algún momento.”
                    </p>
                    <p className="self-end bg-in-blue-gradient py-4 px-6 rounded-md text-in-blue mb-8 lg:mb-16">
                        “Muchas veces es silencioso y se manifiesta como <strong>verrugas</strong>.”
                    </p>
                    <p className="self-end lg:self-center bg-in-blue-gradient py-4 px-6 rounded-md text-in-blue"> 
                        “Si no se trata, puede derivar en <strong>cáncer</strong> de cuello uterino, pene o ano.”
                    </p>
                </div>
                <Image
                    src={cdn("/campanas/vph-jesus-maria/assets/images/sections/header/mujer-bubles.svg")} 
                    alt="Mujer con dudas" 
                    className="hidden md:block absolute bottom-12 lg:bottom-0 left-52 bg-transparent lg:right-12 lg:left-auto bubble-mujer" 
                    width={110} 
                    height={110} 
                    unoptimized
                />
                <Image
                    src={cdn("/campanas/vph-jesus-maria/assets/images/sections/header/hombre-bubles.svg")} 
                    alt="Mujer con dudas" 
                    className="absolute bottom-20 bg-transparent left-12 bubble-hombre" 
                    width={110} 
                    height={110} 
                    unoptimized
                />
            </section>
        </div>

        <Image 
            src={cdn("/campanas/vph-jesus-maria/assets/images/sections/header/wave-cyan.svg")}  alt="Bubble 1" 
            className="w-full h-full object-cover" 
            width={100} 
            height={100} 
            unoptimized/>
    </div>
  )
}
