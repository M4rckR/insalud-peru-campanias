import { cdn } from "@/utils/cdn"
import Image from "next/image"

export const TestimonialBubbles = () => {
  return (
    <div className="pb-8 hidden md:block">
        <div className="bg-in-blue-gradient-section">
            <section className="container relative max-w-5xl mx-auto px-4">
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
