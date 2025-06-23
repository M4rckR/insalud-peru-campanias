import { TestimonialBubbles } from "../components/TestimonialBubbles";
import { Treatment } from "../components/Treatment/Treatment";
import { AboutDevice } from "../components/AboutDevice";
import { AppointmentCta } from "../components/AppointmentCta";
import { Questions } from "../components/Questions";
import { HeroContact } from "../components/hero-2/HeroContact";

export default function DisfuncionJm() {
    return (
        <>
            <HeroContact />
            <TestimonialBubbles 
                titleWithColors="La {cyan}disfunción eréctil{/cyan} no solo afecta tu cuerpo. Afecta cómo te {cyan}ves a ti mismo{/cyan}"
            />
            <Treatment />
            <AboutDevice 
                multipleImages={false}
                srcDesktop={"/campanas/disfuncion/assets/images/sections/main/disfuncion-device.png"}
                alt="Dispositivo de disfunción eréctil"
            />
            <AppointmentCta />
            <Questions />
        </>
    )
}
