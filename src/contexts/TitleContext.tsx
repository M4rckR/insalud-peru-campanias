"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react'

interface TitleContextType {
  hasClaimedPrize: boolean
  claimPrize: (sede?: string, tratamiento?: string) => void
  resetPrize: (sede?: string, tratamiento?: string) => void
}

interface TitleProviderProps {
  children: ReactNode
  sede?: string
  tratamiento?: string
}

const TitleContext = createContext<TitleContextType | undefined>(undefined)

export function TitleProvider({ children, sede, tratamiento }: TitleProviderProps) {
  const [hasClaimedPrize, setHasClaimedPrize] = useState(false)

  // Generar clave única para localStorage
  const getStorageKey = useCallback((sedeParam?: string, tratamientoParam?: string) => {
    const currentSede = sedeParam || sede || 'default';
    const currentTratamiento = tratamientoParam || tratamiento || 'default';
    return `insalud_prize_claimed_${currentSede.toLowerCase().replace(/\s+/g, '_')}_${currentTratamiento.toLowerCase().replace(/\s+/g, '_')}`;
  }, [sede, tratamiento])

  // Verificar si ya se reclamó el premio al montar el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const key = getStorageKey();
      const claimed = localStorage.getItem(key) === 'true';
      setHasClaimedPrize(claimed);
    }
  }, [sede, tratamiento, getStorageKey]);

  const claimPrize = (sedeParam?: string, tratamientoParam?: string) => {
    const key = getStorageKey(sedeParam, tratamientoParam);
    localStorage.setItem(key, 'true');
    setHasClaimedPrize(true);
  }

  const resetPrize = (sedeParam?: string, tratamientoParam?: string) => {
    const key = getStorageKey(sedeParam, tratamientoParam);
    localStorage.removeItem(key);
    setHasClaimedPrize(false);
  }

  return (
    <TitleContext.Provider value={{ hasClaimedPrize, claimPrize, resetPrize }}>
      {children}
    </TitleContext.Provider>
  )
}

export function useTitleContext() {
  const context = useContext(TitleContext)
  if (context === undefined) {
    throw new Error('useTitleContext must be used within a TitleProvider')
  }
  return context
} 