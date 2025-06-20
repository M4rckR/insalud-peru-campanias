'use client'
import { useEffect, useRef, useState } from "react";

type AccordionItemProps = {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

export const AccordionItem = ({title,children, isOpen, onToggle}:AccordionItemProps) => {
    const [height, setHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (isOpen && contentRef.current) {
          setHeight(contentRef.current.scrollHeight);
        } else {
          setHeight(0);
        }
      }, [isOpen]);

  return (
    <div className="border-b border-in-cyan/30 bg-white shadow-lg px-6 py-3 rounded-md">
    <button
      className="w-full flex gap-4 items-center py-4 font-semibold text-in-blue cursor-pointer"
      onClick={onToggle}
    >

        <span className="relative flex items-center">
          <p className="text-lg text-left pl-12 font-in-poppins">{title}</p>
          <span
          className={`absolute w-[18px] rounded-lg h-[3px] bg-in-blue transition-all duration-300 after:absolute after:left-2  after:-top-[8px] after:w-[3px] after:h-[18px] after:bg-in-blue after:content-[''] after:rounded-lg ${
              isOpen ? 'bg-in-cyan-base w-[22px] after:bg-in-cyan-text after:opacity-0' : '-rotate-90 '
          }`}
          >
        
      </span> 
        </span>
    </button>

    <div
      style={{ maxHeight: `${height}px` }}
      className="transition-all duration-500 ease-in-out overflow-hidden"
    >
      <div ref={contentRef} className="pb-4 pl-12 text-sm text-in-blue/80 font-in-poppins">
        {children}
      </div>
    </div>
  </div>
  )
}
