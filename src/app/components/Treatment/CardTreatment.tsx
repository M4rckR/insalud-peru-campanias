import { cn } from "@/lib/utils"
import { cdn } from "@/utils/cdn"
import Image from "next/image"

type CardTreatmentProps = {
    title: string
    description: string
    image: string
    className?: string
}

export const CardTreatment = ({ title, description, image, className }: CardTreatmentProps) => {
    return (
    <>
        <div className={cn("md:w-1/2 w-full flex xl:max-w-[400px] items-center shadow md:shadow-in-cyan-base border border-in-cyan-base gap-4 px-6 md:px-0 md:pr-6 rounded-xl flex-col md:flex-row py-12 md:p-4 bg-in-cyan md:bg-transparent", className)}>
            <Image src={cdn(image)} 
            alt="Seguro y Efectivo"
            width={120}
            height={120}
            className="w-20 h-20"
            unoptimized
            />
            <div className="text-center md:text-left font-in-roboto">
                <h3 className="text-in-cyan-base font-bold text-2xl">{title}</h3>
                <p className="text-in-blue">{description}</p>
            </div>
        </div>
    </>
    )
}
