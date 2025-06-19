import { cdn } from "@/utils/cdn"
import Image from "next/image"

export const AboutDevice = () => {
  return (
    <div className="relative overflow-hidden">
        {/* Wave superior */}
        <Image
            src={cdn("/campanas/vph-jesus-maria/assets/images/sections/main/wave-cyan-top.svg")}
            alt="Wave Cyan Top"
            width={1000}
            height={1000}
            className="w-full h-auto"
        />
        
        <div className="-mt-1 bg-in-cyan relative">
            <div className="container max-w-7xl mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 z-10">
                        <h2 className="text-in-cyan-base text-center md:text-left text-4xl lg:text-5xl md:font-bold font-in-nunito font-black">
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
                                className="w-full h-auto relative z-10 mt-8 md:mt-0 lg:-mt-12 xl:-mt-20"
                                unoptimized
                            />                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Estadísticas con margen negativo */}
        <div className="-mt-12 relative z-30">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <article className="bg-in-variant-cyan rounded-xl p-6 shadow-lg w-full min-w-0 max-w-[460px] md:max-w-none mx-auto md:mx-0">
                        <div className="flex items-center justify-center gap-4">
                            <div className="text-4xl lg:text-5xl font-black text-in-blue font-in-nunito">
                                +20000
                            </div>
                            <div className="text-in-blue">
                                <p className="font-semibold leading-none">Atenciones
                                <span className="block">satisfactorias</span></p>
                            </div>
                        </div>
                    </article>
                    
                    <article className="bg-in-variant-cyan rounded-xl p-6 shadow-lg w-full min-w-0 max-w-[460px] md:max-w-none mx-auto md:mx-0">
                        <div className="flex items-center justify-center gap-4">
                            <div className="text-4xl lg:text-5xl font-black text-in-blue font-in-nunito">
                                +10
                            </div>
                            <div className="text-in-blue">
                                <p className="font-semibold leading-none">Años de
                                <span className="block">experiencia médica</span></p>
                            </div>
                        </div>
                    </article>
                    
                    <article className="bg-in-variant-cyan rounded-xl p-6 shadow-lg w-full min-w-0 max-w-[460px] md:max-w-none mx-auto md:mx-0">
                        <div className="flex items-center justify-center gap-4">
                            <div className="text-4xl lg:text-5xl font-black text-in-blue font-in-nunito">
                                +5
                            </div>
                            <div className="text-in-blue">
                                <p className="font-semibold leading-none">Sedes de atención
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
