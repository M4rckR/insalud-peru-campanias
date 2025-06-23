import { TestimonialBubbles } from "../components/TestimonialBubbles";
import { Treatment } from "../components/Treatment/Treatment";
import { AboutDevice } from "../components/AboutDevice";
import { Questions } from "../components/Questions";
import { AppointmentCta } from "../components/AppointmentCta";
import { HeroContact } from "../components/hero-1/HeroContact";


export default function VpHJm() {
  return (
    <>
      <HeroContact />
      <TestimonialBubbles />
      <Treatment />
      <AboutDevice 
        multipleImages={true}
        srcDesktop={"/campanas/vph-jesus-maria/assets/images/sections/main/equipo-vph.png"}
        srcMobile={"/campanas/vph-jesus-maria/assets/images/sections/main/equipo-vph-mobile.png"}
        alt="Equipo médico láser CO2"
      />
      <AppointmentCta />
      <Questions />
    </>
  );
}
