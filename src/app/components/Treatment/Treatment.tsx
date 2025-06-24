import { CardTreatment } from "./CardTreatment"

type CardData = {
    title: string;
    description: string;
    image: string;
    alt?: string;
    className?: string;
}

type TreatmentProps = {
    title?: string;
    titleWithColors?: string;
    subtitle?: string;
    cards: CardData[];
}

export const Treatment = ({ 
    title, 
    titleWithColors, 
    subtitle, 
    cards 
}: TreatmentProps) => {

    // Función para renderizar el titulo con colores (similar a TestimonialBubbles)
    const renderTitleWithColors = (text: string) => {
        const parts = text.split(/(\{cyan\}.*?\{\/cyan\}|\{blue\}.*?\{\/blue\})/g);
        
        return parts.map((part, index) => {
            if (part.includes('{cyan}')) {
                const cleanText = part.replace(/\{cyan\}|\{\/cyan\}/g, '');
                return <span key={index} className="text-in-cyan-base block">{cleanText}</span>;
            } else if (part.includes('{blue}')) {
                const cleanText = part.replace(/\{blue\}|\{\/blue\}/g, '');
                return <span key={index} className="text-in-blue">{cleanText}</span>;
            } else {
                return <span key={index} className="text-in-blue">{part}</span>;
            }
        });
    };

    // Dividir las tarjetas en dos filas
    const topCards = cards.slice(0, 2);
    const bottomCards = cards.slice(2, 4);

    return (
        <div className="max-w-5xl px-4 mx-auto container pb-16 md:pb-28">
            <section className="grid grid-rows-[auto_min-content_auto] gap-0 md:gap-6">
                {/* Primera fila de tarjetas */}
                {topCards.length > 0 && (
                    <div className="flex flex-col md:flex-row gap-6 xl:gap-0 justify-between items-start md:py-6">
                        {topCards.map((card, index) => (
                            <CardTreatment
                                key={`top-${index}`}
                                className={`xl:mt-6 ${card.className || ''}`}
                                title={card.title}
                                description={card.description}
                                image={card.image}
                                alt={card.alt}
                            />
                        ))}
                    </div>
                )}
                
                {/* Título central */}
                <div className="text-center space-y-2 py-6 row-start-1 md:row-start-2">
                    {titleWithColors ? (
                        <h2 className="font-black font-in-nunito pt-8 md:pt-0 text-3xl md:text-4xl">
                            {renderTitleWithColors(titleWithColors)}
                        </h2>
                    ) : title ? (
                        <h2 className="font-black font-in-nunito pt-8 md:pt-0 text-3xl md:text-4xl text-in-blue">
                            {title}
                        </h2>
                    ) : null}
                    
                    {subtitle && (
                        <p className="text-in-blue font-semibold md:text-xl font-in-roboto">
                            {subtitle}
                        </p>
                    )}
                </div>
                
                {/* Segunda fila de tarjetas */}
                {bottomCards.length > 0 && (
                    <div className="flex flex-col md:flex-row md:justify-between gap-6 xl:gap-0 items-start md:py-6 xl:px-10">
                        {bottomCards.map((card, index) => (
                            <CardTreatment
                                key={`bottom-${index}`}
                                className={`${index === 0 ? 'xl:mt-6' : ''} ${card.className || ''}`}
                                title={card.title}
                                description={card.description}
                                image={card.image}
                                alt={card.alt}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}
