"use client"

import React, { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Sparkles } from 'lucide-react'
import { Button } from './button'
import { cdn } from '@/utils/cdn'
import Image from 'next/image'
import { SpinWheelProps } from '@/types'
import Confetti from 'react-confetti'
import { useTitleContext } from '@/contexts/TitleContext'

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
  const { claimPrize } = useTitleContext();
  const [isSpinning, setIsSpinning] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [spinCount, setSpinCount] = useState(0) // Contador de giros
  const [isWinner, setIsWinner] = useState(false) // Si ganó o no
  
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const wheelRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const sparklesRef = useRef<HTMLDivElement>(null)
  const resultModalRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!isOpen) return

    // Animación de entrada
    gsap.set([overlayRef.current, modalRef.current], { opacity: 0 })
    gsap.set(modalRef.current, { scale: 0.5, y: 100 })

    const tl = gsap.timeline()
    tl.to(overlayRef.current, { opacity: 1, duration: 0.5 })
      .to(modalRef.current, { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "back.out(1.7)" 
      }, "-=0.3")

    // Animación del indicador
    gsap.to(indicatorRef.current, {
      scale: 1.1,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    })
  }, [isOpen])

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setSpinCount(prev => prev + 1)
    
    // Detener animación del indicador
    gsap.set(indicatorRef.current, { scale: 1 })
    
    // ✅ LÓGICA DE 2 GIROS: Primer giro pierde, segundo giro gana
    const currentSpin = spinCount + 1 // Este será el número de giro actual
    const baseRotations = 1665 // Vueltas completas que dará

    let finalRotation

    // 🎯 OBTENER ROTACIÓN ACTUAL para acumular
    const currentRotation = gsap.getProperty(wheelRef.current, "rotation") as number || 0

    if (currentSpin === 1) {
      // PRIMER GIRO: Usar firstSpinAngle si está disponible, sino usar la lógica original
      const firstAngle = firstSpinAngle !== undefined ? firstSpinAngle : (winningAngle + 90)
      finalRotation = currentRotation + baseRotations + firstAngle
      setIsWinner(false)
    } else {
      // SEGUNDO GIRO: Usar secondSpinAngle si está disponible, sino usar winningAngle
      const secondAngle = secondSpinAngle !== undefined ? secondSpinAngle : winningAngle
      finalRotation = currentRotation + baseRotations + secondAngle
      setIsWinner(true)
    }
    
    // ✅ EFECTO PÉNDULO REALISTA
    const overshoot = 25 // Grados extra que se pasa
    const overshootRotation = finalRotation + overshoot

    // Crear timeline para efecto péndulo
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
            setTimeout(() => {
              // ✅ USAR currentSpin en lugar de spinCount para evitar problemas de timing
              
              if (currentSpin === 1) {
                // PRIMER GIRO COMPLETADO: No mostrar modal, solo resetear para mostrar botón
                setShowResult(false)
                setIsSpinning(false)
              } else if (currentSpin === 2) {
                // SEGUNDO GIRO COMPLETADO: Mostrar modal con resultado final
                setShowResult(true)
                
                if (isWinner) {
                  // GANÓ: Celebración completa
                  gsap.fromTo(sparklesRef.current, 
                    { scale: 0 },
                    { 
                      scale: 1, 
                      duration: 1, 
                      ease: "back.out(1.7)"
                    }
                  )
                }
              }
            }, 500)
          }
        })
      }
    })

    // 1. Giro principal (se pasa del punto)
    tl.to(wheelRef.current, {
      rotation: overshootRotation,
      duration: spinDuration,
      ease: "power3.out"
    })
    
    // 2. Efecto péndulo: regresa hacia atrás (más suave)
    .to(wheelRef.current, {
      rotation: finalRotation - 8, // Se va un poco hacia atrás (menos brusco)
      duration: 0.8, // Más lento para que se sienta natural
      ease: "power1.out" // Más suave que power2
    })
    
    // 3. Se estabiliza en la posición final
    .to(wheelRef.current, {
      rotation: finalRotation,
      duration: 0.6, // Más tiempo para asentarse
      ease: "power1.inOut" // Muy suave
    })
  }

  const handleClose = () => {
    // Activar el cambio de título cuando se reclama el premio
    if (isWinner) {
      claimPrize()
    }
    
    // Cerrar INMEDIATAMENTE la ruleta usando onClose
    if (onClose) {
      onClose()
    }
    
    // También ejecutar onComplete para registrar que completó la ruleta
    if (onComplete) {
      onComplete()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
              { showResult && isWinner && (
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
          >
            ✕
          </button>
        )}


        {/* Ruleta Container */}
        <div className={`relative flex justify-center items-center mb-8 transition-all duration-1000 ease-out ${showResult ? 'opacity-0 -translate-y-20 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>

          {/* Sparkles celebración */}
          <div 
            ref={sparklesRef}
            className={`absolute inset-0 pointer-events-none z-30 ${!showResult && "opacity-0"}`}
          >
            <Sparkles className="absolute top-2 left-2 w-6 h-6 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute top-4 right-6 w-4 h-4 text-in-cyan-base animate-pulse" />
            <Sparkles className="absolute bottom-6 left-8 w-7 h-7 text-in-orange animate-pulse" />
            <Sparkles className="absolute bottom-2 right-2 w-5 h-5 text-purple-400 animate-pulse" />
          </div>

          <div className="relative">
            {/* Ruleta que gira */}
            <div ref={wheelRef}>
              <Image
                src={cdn(wheelSvgPath)}
                alt="Ruleta de premios"
                width={400}
                height={400}
                className="drop-shadow-2xl"
                priority
              />
            </div>

            {/* Indicador fijo */}
            <div 
              ref={indicatorRef}
              className="absolute -top-4 left-1/2 transform -translate-x-1/2 -translate-y-3 z-20"   
            >
              <Image
                src={cdn(indicatorSvgPath)}
                alt="Indicador"
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
                 {/* Solo mostrar confetti cuando gana */}
                 {/* {isWinner && (
                   <Confetti 
                     width={window.innerWidth}
                     height={window.innerHeight}
                     numberOfPieces={400}
                     recycle={true}
                     gravity={0.3}
                     wind={0.05}
                     initialVelocityX={20}
                     initialVelocityY={30}
                     tweenDuration={8000}
                     run={true}
                     confettiSource={{
                       x: window.innerWidth / 4,
                       y: -100,
                       w: 1200,
                       h: 100
                     }}
                     className="fixed inset-0 z-[9998] pointer-events-none"
                   />
                 )}
                  */}
                 <Image 
                   src={cdn(isWinner ? "/shared/ruleta/gift-ruleta.png" : "/shared/ruleta/gift-ruleta.png")} 
                   alt="Ruleta result" 
                   width={100} 
                   height={88} 
                   className='mx-auto w-24' 
                 />
                 
              {/* Contenido principal */}
                 <h2 className="text-2xl md:text-4xl text-center font-black text-in-cyan-base font-in-nunito">
                   {isWinner ? "¡Ganaste una consulta gratis!" : "¡Casi lo logras!"}
                 </h2>
                 
                 {!isWinner && (
                   <p className="text-center text-white text-lg font-in-poppins px-4">
                     {spinCount === 1 ? "No te desanimes, ¡inténtalo una vez más!" : "¡Sigue intentando en tu próxima visita!"}
                   </p>
                 )}

                 {/* Botón de acción */}
            </div>
            <div className='w-full flex justify-center items-center'>
                <Button
                  onClick={isWinner ? handleClose : () => {
                    setShowResult(false)
                    setIsSpinning(false)
                  }}
                  className="py-6 bg-gradient-to-r from-in-orange to-in-orange-hover hover:from-in-orange-hover hover:to-in-orange text-white font-bold text-xl px-10 rounded-3xl font-in-poppins transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  {isWinner ? "Reclamar ahora" : (spinCount === 2 ? "Entendido" : "Intentar de nuevo")}
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
        <p className='text-[#908F8F] text-center text-xs py-4'>Solo con fines ilustrativos. Todos pueden obtener el mejor resultado en esta interfaz. Solo nuevos pacientes de Insalud que compren procedimiento de Cauterización.</p>
      </div>
    </div>
  )
}