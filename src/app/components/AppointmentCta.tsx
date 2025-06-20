import { cdn } from "@/utils/cdn"
import Image from "next/image"
import { FaWhatsapp } from "react-icons/fa";


export const AppointmentCta = () => {
    return (
      <section className="container mx-auto px-4 max-w-7xl pb-20 lg:pb-32">
          <div data-aos="fade-up"
       data-aos-duration="800" className="bg-in-cyan relative flex flex-col items-center px-6 py-16 text-center text-in-blue rounded-2xl gap-4 max-w-[1200px] mx-auto">
              <div className="max-w-[840px] space-y-4">
                  <h2 className="hidden font-in-nunito md:block text-xl md:text-2xl lg:text-3xl font-black leading-10">Recupera tu confianza con un <br /> tratamiento clínico eficaz y personalizado</h2>
                  <h2 className="md:hidden font-in-nunito text-xl md:text-2xl lg:text-3xl font-bold">Recupera tu confianza con un  tratamiento clínico <span className="hidden sm:block">eficaz y personalizado</span> </h2>
                  <p className="font-in-poppins">Nuestro equipo de especialistas en Quito está listo para ayudarte a dar el primer paso hacia tu bienestar.</p>
              </div>
              <a className="btn-wsp-quito flex items-center justify-center bg-white gap-2 py-3 px-6 shadow-2xl rounded-4xl animate-[var(--animate-heartbeat)]" href="https://wa.link/ur5m3o" target="_blank">
                  <FaWhatsapp className="text-in-cyan-text text-2xl text-in-cyan-base" />
                  <p className="text-in-cyan-text font-in-poppins font-medium text-in-cyan-base">Agenda tu cita ahora</p>
              </a>
  
              {/* Iconos */}
              <Image 
                width={10} 
                height={10} 
                className="absolute w-14 md:w-28 left-0 top-2 md:-top-12 animate-[var(--animate-pulse)]" 
                src={cdn('/shared/otros/plus-cyan.png')} 
                alt="plus icon" 
                unoptimized
            />
              <Image 
                width={10} 
                height={10} 
                className="absolute w-14 md:w-22 right-4 -bottom-2 animate-[var(--animate-pulse)]" 
                src={cdn('/shared/otros/plus-cyan.png')} 
                alt="plus icon" 
                unoptimized
             />
              <Image 
                width={10} 
                height={10} 
                className="absolute hidden xl:block md:w-10 left-0 lg:-left-8 top-1/2 -translate-y-1/2 animate-[var(--animate-pulse)]" 
                src={cdn('/shared/otros/plus-cyan.png')} 
                alt="plus icon" 
                unoptimized
            />
              <Image 
                width={10} 
                height={10} 
                className="absolute w-10 left-1/6  -bottom-6  animate-[var(--animate-pulse)]" 
                src={cdn('/shared/otros/plus-cyan.png')} 
                alt="plus icon" 
                unoptimized
            />
              <Image 
                width={10} 
                height={10} 
                className="absolute w-6 left-5/6 -top-4 animate-[var(--animate-pulse)]" 
                src={cdn('/shared/otros/plus-cyan.png')} 
                alt="plus icon" 
                unoptimized
              />
              <Image 
                width={10} 
                height={10} 
                className="absolute hidden xl:block w-10 -right-8 animate-[var(--animate-pulse)]" 
                src={cdn('/shared/otros/plus-cyan.png')} 
                alt="plus icon" 
                unoptimized
            />
          </div>
      </section>
    )
  }
  