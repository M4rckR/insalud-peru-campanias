import { cdn } from "@/utils/cdn";
import Image from "next/image";

type AboutDeviceProps = {
  multipleImages?: boolean;
  srcDesktop: string;
  srcMobile?: string;
  alt: string;
  title?: string;
  titleWithColors?: string;
};

export const AboutDevice = ({
  multipleImages,
  srcDesktop,
  srcMobile,
  alt,
  title,
  titleWithColors,
}: AboutDeviceProps) => {
  // Función para renderizar el titulo con colores (similar a Treatment y TestimonialBubbles)
  const renderTitleWithColors = (text: string) => {
    const parts = text.split(/(\{cyan\}.*?\{\/cyan\}|\{blue\}.*?\{\/blue\})/g);
    
    return parts.map((part, index) => {
      if (part.includes('{cyan}')) {
        const cleanText = part.replace(/\{cyan\}|\{\/cyan\}/g, '');
        return <span key={index} className="text-in-cyan-base">{cleanText}</span>;
      } else if (part.includes('{blue}')) {
        const cleanText = part.replace(/\{blue\}|\{\/blue\}/g, '');
        return <span key={index} className="text-in-blue">{cleanText}</span>;
      } else {
        return <span key={index} className="text-in-cyan-base">{part}</span>;
      }
    });
  };

  return (
    <div className="relative overflow-hidden mb-12 md:mb-32">
      <Image
        src={cdn(
          "/campanas/vph-jesus-maria/assets/images/sections/main/wave-cyan-top.svg"
        )}
        alt="Wave Cyan Top"
        width={1000}
        height={1000}
        className="w-full h-auto"
      />

      <div className="-mt-1 bg-in-cyan relative">
            <div className="container max-w-6xl mx-auto px-4 md:pb-20">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
             <div className="lg:flex-1 z-10">
              {titleWithColors ? (
                <h2 className="text-center pt-12 md:pt-16 lg:pt-0 lg:text-left text-3xl lg:text-4xl xl:text-5xl font-in-nunito font-black pb-2 md:pb-0 md:px-12 lg:px-0">
                  {renderTitleWithColors(titleWithColors)}
                </h2>
              ) : title ? (
                <h2 className="text-in-cyan-base text-center pt-12 md:pt-16 lg:pt-0 lg:text-left text-3xl lg:text-4xl xl:text-5xl font-in-nunito font-black pb-2 md:pb-0 px-12 lg:px-0">
                  {title}
                </h2>
              ) : (
                <h2 className="text-in-cyan-base text-center pt-12 md:pt-16 lg:pt-0 lg:text-left text-3xl lg:text-4xl xl:text-5xl font-in-nunito font-black pb-2 md:pb-0 px-12 lg:px-0">
                  Equipos{" "}
                  <span className="text-in-blue">
                    profesionales de primer nivel{" "}
                  </span>{" "}
                  <span className="text-in-blue hidden md:inline">
                    y Médicos especialistas
                  </span>{" "}
                  <span className="text-in-blue hidden md:inline">
                    certificados
                  </span>
                </h2>
              )}
            </div>

                         <div className="lg:flex-1 relative flex justify-center lg:justify-end">
              <div className="relative">
                {multipleImages ? (
                  <>
                    <Image
                      src={cdn(srcDesktop)}
                      alt={alt}
                      width={800}
                      height={500}
                      className="hidden md:block w-full h-auto relative z-10 md:mt-0 lg:-mt-12 xl:-mt-20"
                    />
                    <Image
                      src={cdn(srcMobile || "")}
                      alt={alt}
                      width={400}
                      height={500}
                      className="w-full max-w-[400px] lg:max-w-none md:hidden mb-4"
                                          />
                  </>
                ) : (
                  <Image
                    src={cdn(srcDesktop)}
                    alt={alt}
                    width={400}
                    height={500}
                    className="w-full max-w-[400px] lg:max-w-none h-auto relative z-10 md:mt-0 lg:-mt-12 xl:-mt-20"
                    unoptimized
                  />
                )}
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
              <div className="flex flex-col md:flex-row gap-4 xl:gap-12">
            <article className="bg-in-variant-cyan rounded-xl p-6 shadow-lg w-full md:flex-1 min-w-0 max-w-[460px] md:max-w-none mx-auto md:mx-0">
              <div className="flex sm:flex-col lg:flex-row justify-start items-center md:justify-center gap-2 lg:gap-4">
                <div className="text-4xl lg:text-5xl font-black text-in-blue font-in-nunito">
                  +20000
                </div>
                <div className="text-in-blue sm:text-center lg:text-left">
                  <p className="font-semibold leading-none font-in-roboto">
                    Atenciones
                    <span className="block">satisfactorias</span>
                  </p>
                </div>
              </div>
            </article>

            <article className="bg-in-variant-cyan rounded-xl p-6 shadow-lg w-full md:flex-1 min-w-0 max-w-[460px] md:max-w-none mx-auto md:mx-0">
              <div className="flex sm:flex-col lg:flex-row justify-start items-center md:justify-center gap-2 lg:gap-4">
                <div className="text-4xl lg:text-5xl font-black text-in-blue font-in-nunito">
                  +10
                </div>
                <div className="text-in-blue sm:text-center lg:text-left">
                  <p className="font-semibold leading-none font-in-roboto">
                    Años de
                    <span className="block">experiencia médica</span>
                  </p>
                </div>
              </div>
            </article>

            <article className="bg-in-variant-cyan rounded-xl p-6 shadow-lg w-full md:flex-1 min-w-0 max-w-[460px] md:max-w-none mx-auto md:mx-0">
              <div className="flex sm:flex-col lg:flex-row justify-start items-center md:justify-center gap-2 lg:gap-4">
                <div className="text-4xl lg:text-5xl font-black text-in-blue font-in-nunito">
                  +5
                </div>
                <div className="text-in-blue sm:text-center lg:text-left">
                  <p className="font-semibold leading-none font-in-roboto">
                    Sedes de atención
                    <span className="block">en latinoamérica</span>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};
