import { cdn } from "@/utils/cdn"
import Image from "next/image"

export const AboutDevice = () => {
  return (
    <div className="relative overflow-hidden mb-12 md:mb-32">
        <Image
            src={cdn("/campanas/vph-jesus-maria/assets/images/sections/main/wave-cyan-top.svg")}
            alt="Wave Cyan Top"
            width={1000}
            height={1000}
            className="w-full h-auto"
        />
        
        <div className="-mt-1 bg-in-cyan relative">
            <div className="container max-w-6xl mx-auto px-4 md:pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 z-10">
                        <h2 className="text-in-cyan-base text-center pt-12 md:pt-16 lg:pt-0 lg:text-left text-3xl lg:text-4xl xl:text-5xl md:font-bold font-in-nunito font-black pb-2 md:pb-0 px-12 lg:px-0">
                            Equipos{" "}
                            <span className="text-in-blue">profesionales de primer nivel </span>{" "}
                            <span className="text-in-blue hidden md:inline">y Médicos especialistas</span>{" "}
                            <span className="text-in-blue hidden md:inline">certificados</span>
                        </h2>
                    </div>
                        
                    <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                    
                        <div className="relative">
                            <Image
                                src={cdn("/campanas/vph-jesus-maria/assets/images/sections/main/equipo-vph.png")}
                                alt="Equipo médico láser CO2"
                                width={400}
                                height={500}
                                className="hidden md:block w-full h-auto relative z-10 mt-8 md:mt-0 lg:-mt-12 xl:-mt-20"
                                unoptimized
                            />                            
                            <Image
                                src={cdn("/campanas/vph-jesus-maria/assets/images/sections/main/equipo-vph-mobile.png")}
                                alt="Equipo médico láser CO2"
                                width={400}
                                height={500}
                                className="w-full md:hidden max-w-64 mb-4"
                                unoptimized
                            />                            
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-0 md:-mt-12 relative z-30">
                <h2 className="text-right md:hidden px-4 text-4xl sm:3xl font-black font-in-nunito text-in-cyan-base bg-in-cyan pb-52 ">
                    <div className="max-w-64 mx-auto">
                        Médicos
                        <div className="flex sm:block flex-col text-in-blue">
                            <span className="">especialistas</span> {""}
                            <span className="">certificados</span>
                        </div>
                    </div> 
                    
                    </h2>
            <div className="container max-w-6xl mx-auto px-4 -mt-40 md:-mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-12">
                    <article className="bg-in-variant-cyan rounded-xl p-6 shadow-lg w-full min-w-0 max-w-[460px] md:max-w-none mx-auto md:mx-0">
                        <div className="flex sm:flex-col lg:flex-row justify-start items-center md:justify-center gap-2 lg:gap-4">
                            <div className="text-4xl lg:text-5xl font-black text-in-blue font-in-nunito">
                                +20000
                            </div>
                            <div className="text-in-blue sm:text-center lg:text-left">
                                <p className="font-semibold leading-none font-in-roboto">Atenciones
                                <span className="block">satisfactorias</span></p>
                            </div>
                        </div>
                    </article>
                    
                    <article className="bg-in-variant-cyan rounded-xl p-6 shadow-lg w-full min-w-0 max-w-[460px] md:max-w-none mx-auto md:mx-0">
                        <div className="flex sm:flex-col lg:flex-row justify-start items-center md:justify-center gap-2 lg:gap-4">
                            <div className="text-4xl lg:text-5xl font-black text-in-blue font-in-nunito">
                                +10
                            </div>
                            <div className="text-in-blue sm:text-center lg:text-left">
                                <p className="font-semibold leading-none font-in-roboto">Años de
                                <span className="block">experiencia médica</span></p>
                            </div>
                        </div>
                    </article>
                    
                    <article className="bg-in-variant-cyan rounded-xl p-6 shadow-lg w-full min-w-0 max-w-[460px] md:max-w-none mx-auto md:mx-0">
                        <div className="flex sm:flex-col lg:flex-row justify-start items-center md:justify-center gap-2 lg:gap-4">
                            <div className="text-4xl lg:text-5xl font-black text-in-blue font-in-nunito">
                                +5
                            </div>
                            <div className="text-in-blue sm:text-center lg:text-left">
                                <p className="font-semibold leading-none font-in-roboto">Sedes de atención
                                <span className="block">en latinoamérica</span></p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>
  )
}
