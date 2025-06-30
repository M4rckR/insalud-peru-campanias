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


export const SpinWheel = ({ 
  isOpen, 
  onComplete,
  onClose,
  wheelSvgPath = cdn("/shared/ruleta/ruleta.svg"),
  indicatorSvgPath = cdn("/shared/ruleta/indicador-ruleta.svg"),
  spinDuration = 4,
  winningAngle = 0,
  showCloseButton = true
}: SpinWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [hasSpun, setHasSpun] = useState(false)
  const [showResult, setShowResult] = useState(false)
  
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
    if (isSpinning || hasSpun) return

    setIsSpinning(true)
    
    // Detener animación del indicador
    gsap.set(indicatorRef.current, { scale: 1 })
    
    // ✅ SOLUCIÓN: Siempre parar en la misma posición visual
    const baseRotations = 1665 // Exactamente 4 vueltas completas (360 * 4)
    const finalRotation = baseRotations + winningAngle // Siempre para en el mismo lugar
    
    // ✅ EFECTO PÉNDULO REALISTA
    const overshoot = 25 // Grados extra que se pasa
    const overshootRotation = finalRotation + overshoot

    // Crear timeline para efecto péndulo
    const tl = gsap.timeline({
      onComplete: () => {
        setIsSpinning(false)
        setHasSpun(true)
        
        // Animación del indicador al parar
        gsap.to(indicatorRef.current, {
          scale: 1.4,
          duration: 0.3,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            setTimeout(() => {
              setShowResult(true)
              
              // Celebración
              gsap.fromTo(sparklesRef.current, 
                { scale: 0 },
                { 
                  scale: 1, 
                  duration: 1, 
                  ease: "back.out(1.7)",
                  onComplete: () => {
                    // ✅ ANIMACIÓN MODAL DESDE ABAJO CON TRANSPARENCIA
                    gsap.fromTo(resultModalRef.current,
                      { 
                        y: "100%", // Desde abajo (oculto)
                        opacity: 0 // Empieza transparente
                      },
                      { 
                        y: "0%", // Hacia su posición normal
                        opacity: 1, // Se vuelve completamente opaco
                        duration: 0.6,
                        ease: "power3.out"
                        // ✅ Ya no hay timeout automático - solo se cierra al hacer click
                      }
                    )
                  }
                }
              )
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
    // ✅ ANIMACIÓN DE CIERRE: Modal se va hacia abajo
    const tl = gsap.timeline({ 
      onComplete: () => {
        // Llamar tanto onClose como onComplete cuando termine la animación
        onClose?.()
        onComplete()
      }
    })
    
    // Si hay modal de resultado, animarlo hacia abajo con transparencia
    if (showResult && resultModalRef.current) {
      tl.to(resultModalRef.current, { 
        y: "100%", 
        opacity: 0, // Se vuelve transparente mientras baja
        duration: 0.4, 
        ease: "power3.in" 
      })
    }
    
    // Luego cerrar el modal principal
    tl.to(modalRef.current, { opacity: 0, scale: 0.8, y: 50, duration: 0.3 }, "-=0.2")
      .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1")
  }

  if (!isOpen) return null

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
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
        <div className="relative flex justify-center items-center mb-8">
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
            className="fixed inset-x-0 bottom-0 z-[10000] transform translate-y-full opacity-0"
          >
            <div className="bg-in-blue-gradient-ruleta mx-4 mb-4 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden py-12 space-y-4">
                <Confetti className='w-full px-4 rounded-3xl' tweenDuration={10} />
                <Image src={cdn("/shared/ruleta/gift-ruleta.png")} alt="Ruleta win" width={100} height={88} className='mx-auto w-24' />
              {/* Contenido principal */}
                <h2 className="text-2xl md:text-4xl text-center font-black text-in-cyan-base font-in-nunito">
                  Ganaste una consulta gratis
                </h2>

                {/* Botón de acción */}
            </div>
            <div className='w-full flex justify-center items-center'>
                <Button
                  onClick={handleClose}
                  className="py-6 bg-gradient-to-r from-in-orange to-in-orange-hover hover:from-in-orange-hover hover:to-in-orange text-white font-bold text-xl px-10 rounded-3xl font-in-poppins transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  Reclamar ahora
                </Button>
            </div>
          </div>
        )}

        {/* Botón girar */}
        {!hasSpun && (
            <div className='flex justify-center items-center'>
                <Button
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className="py-7 px-16 bg-gradient-to-r from-in-orange to-in-orange-hover hover:from-in-orange-hover hover:to-in-orange text-white font-bold text-xl rounded-3xl font-in-poppins disabled:opacity-70 transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                    {isSpinning ? (
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                        Girando...
                    </div>
                    ) : (
                    "Girar"
                    )}
                </Button>
            </div>
        )}
        <p className='text-[#908F8F] text-center text-xs py-4'>Solo con fines ilustrativos. Todos pueden obtener el mejor resultado en esta interfaz. Solo nuevos pacientes de Insalud que compren procedimiento de Cauterización.</p>
      </div>
    </div>
  )
}