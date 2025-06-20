'use client'
import { useState } from 'react';
import { AccordionItem } from '@/components/ui/AccordionItem';

export const Questions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="preguntas" className="container mx-auto px-4 max-w-7xl pb-32 lg:pb-48">
      <h2 className="text-center font-in-nunito text-in-cyan-base font-black text-in-cyan-text text-2xl md:text-3xl lg:text-4xl mb-12" data-aos="zoom-in">
        Preguntas <span className='text-in-blue'>Frecuentes</span>
      </h2>

      <div className='flex flex-col md:flex-row gap-6 rounded-lg lg:px-16'>
        <div className='flex flex-col flex-1/2 gap-6'>
          <div className='accordion-item' data-aos="fade-up" data-aos-duration="800">
            <AccordionItem
                  title="¿Funciona para todos?"
                  isOpen={openIndex === 0}
                  onToggle={() => toggleIndex(0)}
              >
                  Sí, la terapia de ondas de choque es efectiva en la gran mayoría de pacientes. Hombres de todas las edades han reportado mejoras en la calidad y duración de sus erecciones desde las primeras sesiones.
              </AccordionItem>
          </div>
          <div className='accordion-item' data-aos="fade-up" data-aos-duration="800">
            <AccordionItem
                  title="¿El tratamiento duele?"
                  isOpen={openIndex === 1}
                  onToggle={() => toggleIndex(1)}
              >
                  No, son indoloras y seguras cuando se realiza por profesionales capacitados. Es un procedimiento no invasivo y sin necesidad de cirugía.
            </AccordionItem>
          </div>

          <div className='accordion-item' data-aos="fade-up" data-aos-duration="800">
            <AccordionItem
              title="¿Cuántas sesiones necesito?"
              isOpen={openIndex === 2}
              onToggle={() => toggleIndex(2)}
            >
              Lo usual es entre 6 a 12 sesiones, según evaluación médica.
            </AccordionItem>
          </div> 
        </div>
          


        <div className='flex flex-col flex-1/2 gap-6'>

          
          <div className='accordion-item' data-aos="fade-up" data-aos-duration="800">
            <AccordionItem
              title="¿Cuánto tiempo dura la sesión?"
              isOpen={openIndex === 3}
              onToggle={() => toggleIndex(3)}
            >
              Cada sesión dura 30 minutos aproximadamente y suelen espaciarse entre una o dos veces por semana.
            </AccordionItem>
          </div>
          
          <div className='accordion-item' data-aos="fade-up" data-aos-duration="800">
            <AccordionItem
              title="¿Necesito realizar algún examen previo?"
              isOpen={openIndex === 4}
              onToggle={() => toggleIndex(4)}
            >
              <span>
                Si, se recomienda realizarse una ecografía doppler de pene para obtener un mejor diagnóstico y poder planificar un mejor tratamiento.
              </span>
            </AccordionItem>
          </div>
          
        </div>

      </div>
    </section>
  );
};
