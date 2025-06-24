'use client'
import { useState } from 'react';
import { AccordionItem } from '@/components/ui/AccordionItem';
import { Question } from '@/types';

type QuestionsProps = {
  questions: Question[];
  title?: string;
  titleWithColors?: string;
}

export const Questions = ({ questions, title, titleWithColors }: QuestionsProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  // Función para renderizar el titulo con colores (similar a otros componentes)
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
    <section id="preguntas" className="container mx-auto px-4 max-w-7xl pb-32 lg:pb-48">
      {titleWithColors ? (
        <h2 className="text-center font-in-nunito font-black text-2xl md:text-3xl lg:text-4xl mb-12">
          {renderTitleWithColors(titleWithColors)}
        </h2>
      ) : title ? (
        <h2 className="text-center font-in-nunito text-in-cyan-base font-black text-2xl md:text-3xl lg:text-4xl mb-12">
          {title}
        </h2>
      ) : (
        <h2 className="text-center font-in-nunito text-in-cyan-base font-black text-in-cyan-text text-2xl md:text-3xl lg:text-4xl mb-12">
          Preguntas <span className='text-in-blue'>Frecuentes</span>
        </h2>
      )}

      <div className='flex flex-col md:flex-row gap-6 rounded-lg lg:px-16'>
        <div className='flex flex-col flex-1/2 gap-6'>
          {questions.slice(0, Math.ceil(questions.length / 2)).map((item, index) => (
            <div key={index} className='accordion-item'>
              <AccordionItem
                title={item.question}
                isOpen={openIndex === index}
                onToggle={() => toggleIndex(index)}
              >
                {item.answer}
              </AccordionItem>
            </div>
          ))}
        </div>

        <div className='flex flex-col flex-1/2 gap-6'>
          {questions.slice(Math.ceil(questions.length / 2)).map((item, index) => {
            const actualIndex = Math.ceil(questions.length / 2) + index;
            return (
              <div key={actualIndex} className='accordion-item'>
                <AccordionItem
                  title={item.question}
                  isOpen={openIndex === actualIndex}
                  onToggle={() => toggleIndex(actualIndex)}
                >
                  {item.answer}
                </AccordionItem>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
