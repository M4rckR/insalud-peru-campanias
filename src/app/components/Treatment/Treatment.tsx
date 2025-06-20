import { CardTreatment } from "./CardTreatment"

export const Treatment = () => {
  return (
    <div className="max-w-5xl px-4 mx-auto container pb-16 md:pb-28">
        <section className="grid grid-rows-[auto_min-content_auto] gap-0 md:gap-6">
            <div className="flex flex-col md:flex-row gap-6 xl:gap-0 justify-between items-start md:py-6">
                <CardTreatment
                    className="xl:mt-6"
                    title="Seguro y efectivo"
                    description="Elimina las verrugas sin dañar la piel."
                    image="/campanas/vph-jesus-maria/assets/images/sections/main/icon-seguro.png"
                />
                <CardTreatment
                    className="mb-6 md:mb-0"
                    title="Sin dolor"
                    description="Tecnología de última generación que minimiza molestias."
                    image="/campanas/vph-jesus-maria/assets/images/sections/main/icon-sin-dolor.png"
                />
            </div>
            <div className="text-center space-y-2 py-6 row-start-1 md:row-start-2">
                <h2 className="font-semibold pt-8 md:pt-0 text-3xl md:text-4xl text-in-blue">
                    ¿Por qué tratarse con <span className="text-in-cyan-base block">Láser CO2?</span>
                </h2>
                <p className="text-in-blue font-semibold md:text-xl font-in-roboto">Conoce los beneficios que te ofrece este tratamiento.</p>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between gap-6 xl:gap-0 items-start md:py-6 xl:px-10">
                <CardTreatment
                    className="xl:mt-6"
                    title="Rápido retorno"
                    description="Vuelve a tu rutina al instante."
                    image="/campanas/vph-jesus-maria/assets/images/sections/main/icon-rapido.png"
                />
                <CardTreatment
                    title="Resultados visibles"
                    description="Elimina las verrugas sin dañar tu piel desde la primera sesión."
                    image="/campanas/vph-jesus-maria/assets/images/sections/main/icon-resultados.png"
                />
            </div>
        </section>
    </div>
  )
}
