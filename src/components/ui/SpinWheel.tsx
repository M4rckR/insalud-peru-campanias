"use client"

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Sparkles } from 'lucide-react'
import { Button } from './button'
import { cdn } from '@/utils/cdn'
import Image from 'next/image'
import { SpinWheelProps } from '@/types'
import confetti from 'canvas-confetti'

// 🎨 Constantes de configuración optimizadas
const CONFETTI_CONFIG = {
  COLORS: ['#00BEB4', '#FFB531', '#004569', '#FFC0FF', '#EDFBFB'] as string[],
  Z_INDEX: '999999',
  DURATION: 4000,
  DELAY_SECOND_BURST: 200
} as const

const SPIN_CONFIG = {
  BASE_ROTATIONS: 1665,
  OVERSHOOT: 25,
  PENDULUM_BACK: 8,
  PENDULUM_DURATION: 0.8,
  SETTLE_DURATION: 0.6
} as const

const ANIMATION_CONFIG = {
  ENTRANCE_DURATION: 0.8,
  INDICATOR_DURATION: 1.5,
  SPARKLES_DURATION: 1,
  RESULT_DELAY: 500
} as const

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
  // 📊 Estados
  const [isSpinning, setIsSpinning] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [spinCount, setSpinCount] = useState(0)
  const [isWinner, setIsWinner] = useState(false)
  
  // 📎 Referencias
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const wheelRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const sparklesRef = useRef<HTMLDivElement>(null)
  const resultModalRef = useRef<HTMLDivElement>(null)

  // 🎊 Funciones de confeti optimizadas
  const createConfettiCanvas = useCallback(() => {
    const canvas = document.createElement('canvas')
    const styles = {
      position: 'fixed' as const,
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      zIndex: CONFETTI_CONFIG.Z_INDEX,
      pointerEvents: 'none' as const
    }
    
    Object.assign(canvas.style, styles)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    document.body.appendChild(canvas)
    return canvas
  }, [])

  const launchConfetti = useCallback(() => {
    const canvas = createConfettiCanvas()
    const myConfetti = confetti.create(canvas, { resize: true, useWorker: false })

    // 🎊 UNA SOLA EXPLOSIÓN ÉPICA
    myConfetti({
      particleCount: 250,           // Más partículas (era 150)
      spread: 90,                   // Explosión más amplia
      origin: { y: 0.5, x: 0.5 },  // Centro de la pantalla
      colors: CONFETTI_CONFIG.COLORS,
      startVelocity: 35,            // Más velocidad
      gravity: 0.7,
      drift: 0,
      ticks: 250,                   // Más duración de las partículas
      scalar: 1.4                   // Piezas más grandes
    })

    // Limpieza automática
    const cleanup = setTimeout(() => {
      if (canvas?.parentNode) {
        document.body.removeChild(canvas)
      }
    }, CONFETTI_CONFIG.DURATION)

    return () => {
      clearTimeout(cleanup)
      if (canvas?.parentNode) {
        document.body.removeChild(canvas)
      }
    }
  }, [createConfettiCanvas])

  // 🎯 Lógica de giro optimizada
  const calculateRotation = useCallback((currentSpin: number) => {
    const currentRotation = gsap.getProperty(wheelRef.current, "rotation") as number || 0
    
    if (currentSpin === 1) {
      const firstAngle = firstSpinAngle ?? (winningAngle + 90)
      return currentRotation + SPIN_CONFIG.BASE_ROTATIONS + firstAngle
    } else {
      const secondAngle = secondSpinAngle ?? winningAngle
      return currentRotation + SPIN_CONFIG.BASE_ROTATIONS + secondAngle
    }
  }, [firstSpinAngle, secondSpinAngle, winningAngle])

  const animateSpinResult = useCallback((currentSpin: number) => {
    const actions = {
      1: () => {
        setShowResult(false)
        setIsSpinning(false)
      },
      2: () => {
        setShowResult(true)
        if (isWinner) {
          gsap.fromTo(sparklesRef.current, 
            { scale: 0 },
            { 
              scale: 1, 
              duration: ANIMATION_CONFIG.SPARKLES_DURATION, 
              ease: "back.out(1.7)"
            }
          )
        }
      }
    }
    
    actions[currentSpin as keyof typeof actions]?.()
  }, [isWinner])

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

  const handleClose = useCallback(() => {
    onClose?.()
    onComplete?.()
  }, [onClose, onComplete])

  // 🎊 Efecto para lanzar confeti
  useEffect(() => {
    if (showResult && isWinner) {
      return launchConfetti()
    }
  }, [showResult, isWinner, launchConfetti])

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
  const canMakeFirstSpin = spinCount === 0
  const canMakeSecondSpin = spinCount === 1 && !isWinner
  const canSpin = canMakeFirstSpin || canMakeSecondSpin
  const shouldShowSpinButton = !showResult && canSpin

  const getButtonText = () => {
    if (isSpinning) return "Girando..."
    return spinCount === 0 ? "Girar" : "Intentar otra vez"
  }

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
      <div ref={modalRef} className="relative rounded-3xl max-w-lg w-full px-4">
        
        {/* Botón cerrar */}
        {showResult && showCloseButton && onClose && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 z-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Cerrar"
          >
            ✕
          </button>
        )}

        {/* Contenedor de la ruleta */}
        <div className="relative flex justify-center items-center mb-8">
          
          {/* Efectos de celebración */}
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

        {/* Modal de resultado */}
        {showResult && (
          <div 
            ref={resultModalRef}
            className="fixed inset-x-0 bottom-16 z-30 animate-slide-up"
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

        {/* Botón de girar */}
        <div className="flex justify-center items-center h-20">
          <Button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`py-7 px-16 bg-gradient-to-r from-in-orange to-in-orange-hover hover:from-in-orange-hover hover:to-in-orange text-white font-bold text-xl rounded-3xl font-in-poppins disabled:opacity-70 transform hover:scale-105 transition-all duration-300 ${
              shouldShowSpinButton ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            {isSpinning ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                {getButtonText()}
              </div>
            ) : (
              getButtonText()
            )}
          </Button>
        </div>
        
        <p className="text-[#908F8F] text-center text-xs py-4">
          Solo con fines ilustrativos. Todos pueden obtener el mejor resultado en esta interfaz. 
          Solo nuevos pacientes de Insalud que compren procedimiento de Cauterización.
        </p>
      </div>
    </div>
  )
}