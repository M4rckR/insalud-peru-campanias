import Image from "next/image"
import { ContactForm } from "./ContactForm"

export const HeroContact = () => {
  return (
    <div className="bg-in-cyan">
        <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8">
                <div className="md:col-span-7">
                    <div className="space-y-4 lg:space-y-8 mb-4 text-left">
                        <h1 className=" text-3xl lg:text-4xl font-bold md:font-semibold font-in-poppins  text-in-cyan-base ">
                            ¿Tienes verrugas genitales? 
                            <span className="hidden md:block text-2xl lg:text-4xl font-semibold text-in-blue">Podrías tener VPH y no saberlo</span> 
                        </h1>
                        <p className="hidden md:block font-medium font-in-nunito text-in-blue text-base lg:text-lg">Agenda tu cita ahora y elimina las verrugas <span className="md:hidden">sin dañar tu piel.</span></p>
                    </div>
                    <ContactForm />
                </div>
                <div className="md:col-span-5 hidden md:block">
                    <Image 
                        src="/images/home/hero-image.png" 
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
