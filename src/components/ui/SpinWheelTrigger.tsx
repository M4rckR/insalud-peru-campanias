"use client"

import React from 'react'
import { useSpinWheel } from '@/hooks/useSpinWheel'
import { SpinWheel } from './SpinWheel'
import { SpinWheelTriggerProps } from '@/types'


/**
 * Componente que maneja el trigger automático de la ruleta
 * Se encarga de mostrar la ruleta después de un delay y manejar su estado
 */
export const SpinWheelTrigger = ({
  autoShowDelay = 4,
  redirectAfterWin,
  wheelSvgPath =    "/shared/ruleta/ruleta.svg",
  indicatorSvgPath = "/shared/ruleta/indicador-ruleta.svg",
  spinDuration = 4,
  winningAngle = 0,
  showCloseButton = true,
  firstSpinAngle,
  secondSpinAngle,
  sede,
  tratamiento
}: SpinWheelTriggerProps) => {
  const { isOpen, hasUserSpun, handleWin, closeWheel } = useSpinWheel({
    autoShowDelay,
    redirectAfterWin,
    sede,
    tratamiento
  })

  // No mostrar nada si ya giró
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