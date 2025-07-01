"use client"

import React, { useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Sparkles } from 'lucide-react'
import { Button } from './button'
import { cdn } from '@/utils/cdn'
import Image from 'next/image'
import { SpinWheelProps } from '@/types'
import Confetti from 'react-confetti'
import { useTitleContext } from '@/contexts/TitleContext'

// Configuraciones constantes
const SPIN_CONFIG = {
  OVERSHOOT: 30,
  PENDULUM_BACK: 15,
  PENDULUM_DURATION: 0.3,
  SETTLE_DURATION: 0.2
}

const ANIMATION_CONFIG = {
  ENTRANCE_DURATION: 0.6,
  INDICATOR_DURATION: 1.5,
  RESULT_DELAY: 1000
}



// COMPONENTE VISUAL DE LA RULETA DE PREMIOS
// -----------------------------------------
// Este componente muestra la ruleta, maneja la animación, el resultado y la integración
// con el contexto de título (TitleContext) y el trigger (SpinWheelTrigger).
// Está preparado para funcionar de forma independiente por sede/tratamiento.

/**
 * SpinWheel
 *
 * Componente visual de la ruleta de premios.
 * - Muestra la animación de giro y el resultado (ganador/perdedor)
 * - Integra con el contexto global para cambiar el título al ganar
 * - Llama a onComplete/onClose según corresponda
 *
 * Props principales:
 * - isOpen: boolean (¿mostrar la ruleta?)
 * - onComplete: función a ejecutar al finalizar
 * - onClose: función a ejecutar al cerrar
 *
 * El estado de "ganador" se maneja internamente y se comunica con el contexto global.
 */
export const SpinWheel = ({ 
  isOpen, 
  onComplete,
  onClose,
  wheelSvgPath = cdn("/shared/ruleta/ruleta.svg"),
  indicatorSvgPath = cdn("/shared/ruleta/indicador-ruleta.svg"),
  spinDuration = 4,
  winningAngle = 0,
  showCloseButton = true,
  firstSpinAngle,
  secondSpinAngle
}: SpinWheelProps) => {
  // Estado local para animaciones y lógica de la ruleta
  const [isSpinning, setIsSpinning] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [spinCount, setSpinCount] = useState(0)
  const [isWinner, setIsWinner] = useState(false)
  
  // Refs para animaciones GSAP
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const wheelRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const sparklesRef = useRef<HTMLDivElement>(null)
  const resultModalRef = useRef<HTMLDivElement>(null)

  // Contexto global para cambiar el título al ganar
  const { claimPrize } = useTitleContext();

  // Función para calcular la rotación final
  const calculateRotation = useCallback((spin: number) => {
    if (spin === 1) return firstSpinAngle || 315
    if (spin === 2) return secondSpinAngle || 225
    return winningAngle
  }, [firstSpinAngle, secondSpinAngle, winningAngle])

  // Función para animar el resultado del giro
  const animateSpinResult = useCallback((spin: number) => {
    setShowResult(true)
    
    // Si es el segundo giro, determinar si ganó
    if (spin === 2) {
      setIsWinner(true)
    }
  }, [])

  // Lógica principal del giro de la ruleta
  const handleSpin = useCallback(() => {
    if (isSpinning) return

    setIsSpinning(true)
    const currentSpin = spinCount + 1
    setSpinCount(currentSpin)
    
    // Determinar resultado
    setIsWinner(currentSpin === 2)
    
    // Detener animación del indicador
    gsap.set(indicatorRef.current, { scale: 1 })
    
    // Calcular rotación
    const finalRotation = calculateRotation(currentSpin)
    const overshootRotation = finalRotation + SPIN_CONFIG.OVERSHOOT

    // Timeline de animación
    const tl = gsap.timeline({
      onComplete: () => {
        setIsSpinning(false)
        
        // Animación del indicador al parar
        gsap.to(indicatorRef.current, {
          scale: 1.4,
          duration: 0.3,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            setTimeout(() => animateSpinResult(currentSpin), ANIMATION_CONFIG.RESULT_DELAY)
          }
        })
      }
    })

    // Secuencia de giro con péndulo
    tl.to(wheelRef.current, {
      rotation: overshootRotation,
      duration: spinDuration,
      ease: "power3.out"
    })
    .to(wheelRef.current, {
      rotation: finalRotation - SPIN_CONFIG.PENDULUM_BACK,
      duration: SPIN_CONFIG.PENDULUM_DURATION,
      ease: "power1.out"
    })
    .to(wheelRef.current, {
      rotation: finalRotation,
      duration: SPIN_CONFIG.SETTLE_DURATION,
      ease: "power1.inOut"
    })
  }, [isSpinning, spinCount, calculateRotation, animateSpinResult, spinDuration])

  // Cierra la ruleta y marca como ganador en el contexto global
  const handleClose = useCallback(() => {
    if (isWinner) {
      claimPrize()
    }
    if (onClose) {
      onClose()
    }
    if (onComplete) {
      onComplete()
    }
  }, [isWinner, claimPrize, onClose, onComplete])

  // 🎬 Animaciones de entrada
  useGSAP(() => {
    if (!isOpen) return

    // Configuración inicial
    gsap.set([overlayRef.current, modalRef.current], { opacity: 0 })
    gsap.set(modalRef.current, { scale: 0.5, y: 100 })

    // Timeline de entrada
    const tl = gsap.timeline()
    tl.to(overlayRef.current, { opacity: 1, duration: 0.5 })
      .to(modalRef.current, { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: ANIMATION_CONFIG.ENTRANCE_DURATION, 
        ease: "back.out(1.7)" 
      }, "-=0.3")

    // Animación continua del indicador
    gsap.to(indicatorRef.current, {
      scale: 1.1,
      duration: ANIMATION_CONFIG.INDICATOR_DURATION,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    })
  }, [isOpen])

  // 🎮 Lógica de botones

  const getResultText = () => {
    if (isWinner) return "¡Ganaste una consulta gratis!"
    return "¡Casi lo logras!"
  }

  const getSubText = () => {
    if (isWinner) return null
    return spinCount === 1 
      ? "No te desanimes, ¡inténtalo una vez más!" 
      : "¡Sigue intentando en tu próxima visita!"
  }

  const getActionButtonText = () => {
    if (isWinner) return "Reclamar ahora"
    return spinCount === 2 ? "Entendido" : "Intentar de nuevo"
  }

  if (!isOpen) return null

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      {/* Confetti para ganadores */}
      {showResult && isWinner && (
        <Confetti 
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={400}
          recycle={false}
          gravity={0.3}
          wind={0.05}
          initialVelocityX={20}
          initialVelocityY={30}
          tweenDuration={3000}
          run={true}
          confettiSource={{
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            w: 10,
            h: 10
          }}
          className="absolute inset-0 z-50 pointer-events-none"
        />
      )}

      <div
        ref={modalRef}
        className="relative rounded-3xl max-w-lg w-full px-4"
      >
        {/* Botón cerrar - Solo después de ganar */}
        {showResult && showCloseButton && onClose && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 z-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Cerrar"
          >
            ✕
          </button>
        )}

        {/* Ruleta Container */}
        <div className={`relative flex justify-center items-center mb-8 transition-all duration-1000 ease-out ${showResult ? 'opacity-0 -translate-y-20 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
          {/* Sparkles celebración */}
          <div 
            ref={sparklesRef}
            className={`absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 ${
              showResult ? "opacity-100" : "opacity-0"
            }`}
          >
            <Sparkles className="absolute top-2 left-2 w-6 h-6 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute top-4 right-6 w-4 h-4 text-in-cyan-base animate-pulse" />
            <Sparkles className="absolute bottom-6 left-8 w-7 h-7 text-in-orange animate-pulse" />
            <Sparkles className="absolute bottom-2 right-2 w-5 h-5 text-purple-400 animate-pulse" />
          </div>

          <div className="relative">
            {/* Ruleta */}
            <div ref={wheelRef}>
              <Image
                src={wheelSvgPath}
                alt="Ruleta de premios"
                width={400}
                height={400}
                className="drop-shadow-2xl"
                priority
              />
            </div>

            {/* Indicador */}
            <div 
              ref={indicatorRef}
              className="absolute -top-4 left-1/2 transform -translate-x-1/2 -translate-y-3 z-20"   
            >
              <Image
                src={indicatorSvgPath}
                alt="Indicador de ruleta"
                width={45}
                height={60}
                className="drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Modal de Resultado - Animado desde abajo */}
        {showResult && (
          <div 
            ref={resultModalRef}
            className="fixed left-0 right-0 bottom-32 z-30 animate-slide-up"
          >
            <div className="bg-in-blue-gradient-ruleta mx-4 mb-4 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden py-12 space-y-4">
              <Image 
                src={cdn("/shared/ruleta/gift-ruleta.png")} 
                alt="Premio de ruleta" 
                width={100} 
                height={88} 
                className="mx-auto w-24" 
              />
              
              <h2 className="text-2xl md:text-4xl text-center font-black text-in-cyan-base font-in-nunito">
                {getResultText()}
              </h2>
              
              {getSubText() && (
                <p className="text-center text-white text-lg font-in-poppins px-4">
                  {getSubText()}
                </p>
              )}
            </div>
            
            <div className="w-full flex justify-center items-center">
              <Button
                onClick={isWinner ? handleClose : () => {
                  setShowResult(false)
                  setIsSpinning(false)
                }}
                className="py-6 bg-gradient-to-r from-in-orange to-in-orange-hover hover:from-in-orange-hover hover:to-in-orange text-white font-bold text-xl px-10 rounded-3xl font-in-poppins transform hover:scale-105 transition-all duration-300"
              >
                {getActionButtonText()}
              </Button>
            </div>
          </div>
        )}

        {/* Botón girar - Layout estable sin saltos */}
        <div className={`flex justify-center items-center h-20 transition-all duration-1000 ease-out ${showResult ? 'opacity-0 -translate-y-10' : 'opacity-100 translate-y-0'}`}>
          {(() => {
            // Puede girar si es el primer intento O si es el segundo intento después de perder
            const canMakeFirstSpin = spinCount === 0
            const canMakeSecondSpin = spinCount === 1 && !isWinner
            const canSpin = canMakeFirstSpin || canMakeSecondSpin
            const shouldShow = !showResult && canSpin
            
            return (
              <Button
                onClick={handleSpin}
                disabled={isSpinning}
                className={`py-7 px-16 bg-gradient-to-r from-in-orange to-in-orange-hover hover:from-in-orange-hover hover:to-in-orange text-white font-bold text-xl rounded-3xl font-in-poppins disabled:opacity-70 transform hover:scale-105 transition-opacity duration-500 ease-in-out cursor-pointer ${shouldShow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              >
                {isSpinning ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Girando...
                  </div>
                ) : (
                  spinCount === 0 ? "Girar" : "Intentar otra vez"
                )}
              </Button>
            )
          })()}
        </div>
        
        <p className="text-[#908F8F] text-center text-xs py-4">
          Solo con fines ilustrativos. Todos pueden obtener el mejor resultado en esta interfaz. 
          Solo nuevos pacientes de Insalud que compren procedimiento de Cauterización.
        </p>
      </div>
    </div>
  )
}