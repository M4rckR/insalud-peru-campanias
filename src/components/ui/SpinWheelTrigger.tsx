"use client"

import React from 'react'
import { useSpinWheel } from '@/hooks/useSpinWheel'
import { SpinWheel } from './SpinWheel'
import { SpinWheelTriggerProps } from '@/types'
import { cdn } from '@/utils/cdn'

// COMPONENTE TRIGGER DE RULETA
// ----------------------------
// Este componente se encarga de mostrar la ruleta automáticamente después de un delay.
// Recibe props de sede y tratamiento para que cada página tenga su propia ruleta independiente.
// Usa el hook useSpinWheel para manejar el estado y la lógica de participación.

/**
 * SpinWheelTrigger
 *
 * Muestra la ruleta automáticamente después de un delay.
 * Cada combinación sede + tratamiento es independiente (localStorage único).
 * Si el usuario ya participó en esa combinación, no se muestra la ruleta.
 *
 * Props principales:
 * - sede: string (ej: "Jesús María")
 * - tratamiento: string (ej: "VPH")
 *
 * Ejemplo de uso:
 * <SpinWheelTrigger sede="Golf" tratamiento="Prostatitis" />
 */
export const SpinWheelTrigger = ({
  autoShowDelay = 4,
  redirectAfterWin,
  wheelSvgPath = cdn("/shared/ruleta/ruleta.svg"),
  indicatorSvgPath = cdn("/shared/ruleta/indicador-ruleta.svg"),
  spinDuration = 4,
  winningAngle = 0,
  showCloseButton = true,
  firstSpinAngle,
  secondSpinAngle,
  sede,
  tratamiento
}: SpinWheelTriggerProps) => {
  // Hook personalizado para manejar la lógica de la ruleta
  const { isOpen, hasUserSpun, handleWin, closeWheel } = useSpinWheel({
    autoShowDelay,
    redirectAfterWin,
    sede,
    tratamiento
  })

  // Si ya participó, no mostrar la ruleta
  if (hasUserSpun) return null

  return (
    <SpinWheel
      isOpen={isOpen}
      onComplete={handleWin}
      onClose={closeWheel}
      wheelSvgPath={wheelSvgPath}
      indicatorSvgPath={indicatorSvgPath}
      spinDuration={spinDuration}
      winningAngle={winningAngle}
      showCloseButton={showCloseButton}
      firstSpinAngle={firstSpinAngle}
      secondSpinAngle={secondSpinAngle}
    />
  )
}