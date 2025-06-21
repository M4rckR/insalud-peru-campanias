"use client"
import Image from "next/image"
import { ContactForm } from "./ContactForm"
import { cdn } from "@/utils/cdn"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);


export const HeroContact = () => {

    const contactFormRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        // Contact Form
        gsap.set(contactFormRef.current, {
            opacity: 0,
            x: -150,
        })

        gsap.to(contactFormRef.current, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.inOut",
        })

        // Image
        gsap.set(imageRef.current, {
            rotate: 20,
            opacity: 0,
            x: 150,
        })

        gsap.to(imageRef.current, {
            rotate: 0,
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.inOut",
        })
    })

  return (
    <div className="bg-in-cyan pb-12 md:pb-32">
        <div className="container max-w-7xl mx-auto px-4">
            <div className="overflow-hidden grid grid-cols-1 md:grid-cols-12 items-center gap-8">
                <div ref={contactFormRef} className="md:col-span-7">
                    <div className="space-y-4 lg:space-y-8 mb-4 text-left">
                        <h1 className=" text-4xl sm:text-5xl md:text-4xl font-bold md:font-semibold font-in-nunito md:font-in-poppins text-in-cyan-base ">
                            ¿Tienes verrugas genitales? 
                            <span className="hidden md:block text-2xl pt-1 lg:text-4xl  font-semibold text-in-blue">Podrías tener VPH y no saberlo</span> 
                        </h1>
                        <Image 
                            src={cdn("/campanas/vph-jesus-maria/assets/images/sections/header/grafico-vph-mobile.png")} 
                            alt="Podrias tener VPH y no saberlo" 
                            width={350}     
                            height={500} 
                            className="w-full md:hidden mb-12"
                            unoptimized
                        />
                        <p className="hidden md:block font-medium font-in-nunito text-in-blue text-base lg:text-lg">Agenda tu cita ahora y elimina las verrugas <span className="md:hidden">sin dañar tu piel.</span></p>
                    </div>
                    <ContactForm />
                </div>
                <div ref={imageRef} className="md:col-span-5 hidden md:block">
                    <Image 
                        src={cdn("/campanas/vph-jesus-maria/assets/images/sections/header/hero-image.png")} 
                        alt="Hero Image" 
                        width={500}     
                        height={500} 
                        className=""
                        unoptimized
                    />
                </div>
            </div>
        </div>
    </div>
  )
}
