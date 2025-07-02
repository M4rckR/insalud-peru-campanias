"use client";

import React, { ReactNode, useEffect, useState, useRef } from 'react';
import { TitleProvider, useTitleContext } from '@/contexts/TitleContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SpinWheel } from './SpinWheel';
import { useSpinWheel } from '@/hooks/useSpinWheel';

interface PageWrapperProps {
  children: ReactNode;
  sede: string;
  tratamiento: string;
  spinWheelProps?: {
    autoShowDelay?: number;
    spinDuration?: number;
    firstSpinAngle?: number;
    secondSpinAngle?: number;
    showCloseButton?: boolean;
  };
}

// Componente interno que tiene acceso al contexto
function PageWrapperContent({ 
  children, 
  sede, 
  tratamiento, 
  spinWheelProps = {} 
}: PageWrapperProps) {
  const [showGift, setShowGift] = useState(true);
  const [showRuleta, setShowRuleta] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // 🎯 SOLUCION HIDRATACION: Solo mostrar componentes después de hidratar
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Refs para animaciones GSAP
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sparkle1Ref = useRef<HTMLDivElement>(null);
  const sparkle2Ref = useRef<HTMLDivElement>(null);
  const sparkle3Ref = useRef<HTMLDivElement>(null);
  const sparkle4Ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Hook para manejar lógica de la ruleta (sin el autoShow automático)
  const { hasUserSpun, handleWin, closeWheel } = useSpinWheel({
    autoShowDelay: 999999, // Delay súper alto para desactivar el auto-show
    sede,
    tratamiento
  });

  // 🎯 ACCESO AL CONTEXTO PARA CAMBIAR TÍTULO
  const { claimPrize } = useTitleContext();

  // Animación tipo Temu con GSAP y transición fluida
  useGSAP(() => {
    if (!showGift || !isHydrated) return;
    
    // 🎯 VALIDACIONES NULL-SAFE PARA EVITAR ERROR GSAP
    if (!overlayRef.current || !modalRef.current || !titleRef.current ||
        !sparkle1Ref.current || !sparkle2Ref.current || 
        !sparkle3Ref.current || !sparkle4Ref.current || !glowRef.current) {
      return;
    }

    const tl = gsap.timeline();

    // 1. Entrada dramática del overlay
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(modalRef.current, { scale: 0, rotation: -10 });
    gsap.set(titleRef.current, { scale: 0, y: 30 });
    gsap.set([sparkle1Ref.current, sparkle2Ref.current, sparkle3Ref.current, sparkle4Ref.current], { 
      scale: 0, 
      rotation: 0 
    });

    tl
      // Overlay aparece
      .to(overlayRef.current, { opacity: 1, duration: 0.3 })
      
      // Modal entra con bounce dramático
      .to(modalRef.current, { 
        scale: 1.1, 
        rotation: 0, 
        duration: 0.6, 
        ease: "back.out(2)" 
      }, 0.2)
      
      // Se estabiliza
      .to(modalRef.current, { 
        scale: 1, 
        duration: 0.3, 
        ease: "power2.out" 
      })
      
      // Título aparece con super bounce
      .to(titleRef.current, { 
        scale: 1.2, 
        y: 0, 
        duration: 0.8, 
        ease: "back.out(3)" 
      }, 0.5)
      
      // Sparkles aparecen en secuencia
      .to(sparkle1Ref.current, { 
        scale: 1, 
        rotation: 360, 
        duration: 0.6, 
        ease: "back.out(2)" 
      }, 0.8)
      .to(sparkle2Ref.current, { 
        scale: 1, 
        rotation: -360, 
        duration: 0.6, 
        ease: "back.out(2)" 
      }, 0.9)
      .to(sparkle3Ref.current, { 
        scale: 1, 
        rotation: 360, 
        duration: 0.6, 
        ease: "back.out(2)" 
      }, 1.0)
      .to(sparkle4Ref.current, { 
        scale: 1, 
        rotation: -360, 
        duration: 0.6, 
        ease: "back.out(2)" 
      }, 1.1)
      
      // Título se estabiliza
      .to(titleRef.current, { 
        scale: 1, 
        duration: 0.4, 
        ease: "power2.out" 
      }, 1.2)
      
      // PAUSA LARGA para leer el primer mensaje
      .to(titleRef.current, { 
        scale: 1, 
        duration: 0.1, 
        ease: "none" 
      }, 4.0) // Primer mensaje visible hasta el segundo 4
      
      // Cambio de texto con efecto zoom
      .call(() => {
        if (titleRef.current) {
          titleRef.current.innerHTML = `
            <h1 class="text-2xl md:text-4xl font-black text-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-tight">
              ¡Perfecto!
            </h1>
            <h2 class="text-2xl md:text-4xl font-black text-center bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent leading-tight mt-2">
              Ahora gira la ruleta
            </h2>
            <div class="flex justify-center mt-6">
              <div class="text-6xl md:text-8xl">🎰</div>
            </div>
          `;
        }
      }, [], 4.1)
      
      // Zoom out del título con nuevo texto
      .to(titleRef.current, {
        scale: 0.9,
        duration: 0.4,
        ease: "power2.inOut"
      }, 4.1)
      
      // PAUSA para leer el segundo mensaje
      .to(titleRef.current, {
        scale: 1,
        duration: 0.1,
        ease: "none"
      }, 7.0) // Segundo mensaje visible hasta el segundo 7
      
      // Preparar salida: sparkles se agrupan al centro
      .to([sparkle1Ref.current, sparkle2Ref.current, sparkle3Ref.current, sparkle4Ref.current], {
        x: 0,
        y: 0,
        scale: 1.5,
        duration: 0.5,
        ease: "power2.inOut"
      }, 7.2)
      
      // Todo se hace pequeño y desaparece
      .to([modalRef.current], {
        scale: 0,
        rotation: 10,
        duration: 0.6,
        ease: "back.in(2)",
        onComplete: () => {
          // ⚡ ACTIVAR RULETA INMEDIATAMENTE SIN DELAY
          setShowGift(false);
          // Usar setTimeout 0 para permitir que React procese el cambio de estado
          setTimeout(() => {
            setShowRuleta(true);
          }, 0);
        }
      }, 7.8);

    // Animaciones continuas SOLO hasta el momento de salida
    // Pulsación suave del título (con validación)
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        scale: 1.05,
        duration: 0.8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1, // Solo 1 repetición para no interferir
        delay: 1.3
      });
    }

    // Sparkles rotando constantemente hasta la salida (con validaciones)
    if (sparkle1Ref.current) {
      gsap.to(sparkle1Ref.current, {
        rotation: "+=180",
        duration: 1.5,
        ease: "none",
        repeat: 1,
        delay: 1.2
      });
    }

    if (sparkle2Ref.current) {
      gsap.to(sparkle2Ref.current, {
        rotation: "-=180",
        duration: 1.8,
        ease: "none",
        repeat: 1,
        delay: 1.2
      });
    }

    if (sparkle3Ref.current) {
      gsap.to(sparkle3Ref.current, {
        rotation: "+=180",
        duration: 1.3,
        ease: "none",
        repeat: 1,
        delay: 1.2
      });
    }

    if (sparkle4Ref.current) {
      gsap.to(sparkle4Ref.current, {
        rotation: "-=180",
        duration: 1.6,
        ease: "none",
        repeat: 1,
        delay: 1.2
      });
    }

    // Glow pulsante limitado (con validación)
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.3,
        scale: 1.1,
        duration: 1,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1,
        delay: 1.4
      });
    }

  }, [showGift, isHydrated]);

  useEffect(() => {
    // El timer ya no es necesario porque GSAP maneja la transición
    // const timer = setTimeout(() => setShowGift(false), MODAL_GIFT_TIME);
    // return () => clearTimeout(timer);
  }, []);

  // Si ya participó, no mostrar nada
  if (hasUserSpun) return <>{children}</>;

  return (
    <TitleProvider sede={sede} tratamiento={tratamiento}>
      {children}
      {/* 🎯 SOLO MOSTRAR MODAL DESPUÉS DE HIDRATAR PARA EVITAR ERRORES */}
      {isHydrated && showGift && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          {/* Modal Container */}
          <div 
            ref={modalRef}
            className="relative"
          >
            {/* Glow Effect */}
            <div 
              ref={glowRef}
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-3xl blur-xl opacity-20 scale-110"
            />
            
            {/* Main Modal */}
            <div className="relative bg-gradient-to-br from-white via-yellow-50 to-orange-50 rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-gradient-to-r border-yellow-300 max-w-[90vw] md:max-w-lg overflow-hidden">
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse" />
                <div className="absolute top-8 right-6 w-6 h-6 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-6 left-8 w-10 h-10 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-4 right-4 w-7 h-7 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
              </div>

              {/* Sparkles */}
              <div ref={sparkle1Ref} className="absolute -top-4 -left-4 text-6xl">⭐</div>
              <div ref={sparkle2Ref} className="absolute -top-4 -right-4 text-5xl">✨</div>
              <div ref={sparkle3Ref} className="absolute -bottom-4 -left-4 text-5xl">💫</div>
              <div ref={sparkle4Ref} className="absolute -bottom-4 -right-4 text-6xl">🎉</div>

              {/* Title */}
              <div 
                ref={titleRef}
                className="relative z-10"
              >
                <h1 className="text-2xl md:text-4xl font-black text-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-tight">
                  ¡Has sido seleccionado
                </h1>
                <h2 className="text-2xl md:text-4xl font-black text-center bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent leading-tight mt-2">
                  para un regalo!
                </h2>
                
                {/* Gift Icon */}
                <div className="flex justify-center mt-6">
                  <div className="text-6xl md:text-8xl animate-bounce">🎁</div>
                </div>
                
                {/* Subtitle */}
                <p className="text-center text-gray-600 font-semibold text-lg md:text-xl mt-4 animate-pulse">
                  Prepárate para una sorpresa...
                </p>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
              <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>
      )}
      {/* 🎯 SOLO MOSTRAR RULETA DESPUÉS DE HIDRATAR */}
      {isHydrated && showRuleta && (
        <SpinWheel
          isOpen={true}
          onComplete={() => {
            // 🎯 LLAMAR TANTO AL HOOK COMO AL CONTEXTO
            handleWin(); // Guarda en localStorage del hook
            claimPrize(); // Cambia el título en el contexto
            setShowRuleta(false);
          }}
          onClose={() => {
            closeWheel();
            setShowRuleta(false);
          }}
          wheelSvgPath="/shared/ruleta/ruleta.svg"
          indicatorSvgPath="/shared/ruleta/indicador-ruleta.svg"
          spinDuration={spinWheelProps.spinDuration || 5}
          firstSpinAngle={spinWheelProps.firstSpinAngle || 315}
          secondSpinAngle={spinWheelProps.secondSpinAngle || 225}
          showCloseButton={spinWheelProps.showCloseButton || false}
        />
      )}
    </TitleProvider>
  );
}

// Componente principal con provider
export function PageWrapper(props: PageWrapperProps) {
  return (
    <TitleProvider sede={props.sede} tratamiento={props.tratamiento}>
      <PageWrapperContent {...props} />
    </TitleProvider>
  );
} 