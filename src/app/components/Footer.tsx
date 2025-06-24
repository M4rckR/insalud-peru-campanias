import { cdn } from '@/utils/cdn'
import Image from 'next/image'

type footerProps = {
    address: string
    phone: string
    email: string
    socials: {
        instagram: string
        tiktok: string
        facebook: string
    }
}

export const Footer = ({ address, phone, email, socials }: footerProps) => {
  return (
    <div className="relative font-in-poppins">
        <div className="absolute bottom-0 left-0 w-full h-[300px] z-[-1] bg-gradient-to-t  from-in-cyan to-white"></div>
        <footer className="container mx-auto px-4 max-w-7xl py-6">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 lg:gap-24 text-in-blue md:mb-12 text-center md:text-left">
                <section className="flex flex-col gap-2 md:gap-0 justify-center md:flex-1/3"> 
                    <Image 
                        className="w-48 mx-auto pb-4 md:pb-6 md:mx-0" 
                        src={cdn('/shared/logos/logo-insalud.svg')} 
                        alt="logo insalud" 
                        width={192}
                        height={50}
                    />
                    <p className="font-semibold capitalize max-w-[440px] md:text-lg md:font-medium md:leading-6 pb-2">Más de 5,000 tratamientos realizados con excelentes resultados.</p>
                    <p className="text-sm leading-relaxed max-w-[440px]">Confía en la terapia que ha ayudado a miles de hombres a recuperar su confianza y bienestar sexual.</p>
                </section>
                <section className="flex flex-col gap-4 md:flex-1/3">
                    <div className="md:space-y-2">
                        <p className="font-medium md:font-normal">Te esperamos en:</p>
                        <p className="text-sm md:text-base md:font-medium">{address}</p>
                    </div>
                    <div className="md:space-y-2">
                        <p className="font-medium md:font-normal">Conversemos sobre tu caso</p>
                        <p className="text-sm md:text-base md:font-medium">+51 {phone} <br /> {email}</p>
                    </div>
                </section>
                <section className="space-y-2 md:space-y-4 md:flex-1/3 mb-4 md:mb-0">
                    <p className="text-sm md:text-base">Síguenos y entérate primero</p>
                    <div className="flex justify-center md:justify-start gap-4">
                        <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Seguir en Instagram">
                            <Image 
                                src={cdn('/shared/iconos/instagram.svg')} 
                                className="w-7 sm:w-6 cursor-pointer hover:scale-110 transition-all duration-150" 
                                alt="logo instagram" 
                                width={28}
                                height={28}
                            />
                        </a>
                        <a href={socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="Seguir en TikTok">
                            <Image 
                                className="w-7 sm:w-6 cursor-pointer hover:scale-110 transition-all duration-150" 
                                src={cdn('/shared/iconos/tiktok.svg')} 
                                alt="logo tiktok" 
                                width={28}
                                height={28}
                            />
                        </a>
                        <a href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Seguir en Facebook">
                            <Image 
                                className="w-7 sm:w-6 cursor-pointer hover:scale-110 transition-all duration-150" 
                                width={28}
                                height={28}
                                src={cdn('/shared/iconos/fb.svg')} 
                                alt="logo facebook" 
                            />
                        </a>
                    </div>
                </section>
            </div>
            <div className="flex flex-col md:flex-row justify-between text-center font-semibold md:font-normal text-in-blue">
                <p>© 2025 All Rights Reserved.</p>
                <p>Team Insalud</p>
            </div>
        </footer>
    </div>
  )
}
