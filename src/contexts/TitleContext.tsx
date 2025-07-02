"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react'

/**
 * 🏆 Context para manejar el cambio dinámico de títulos cuando se reclama un premio
 * 
 * FUNCIONALIDAD:
 * - ✅ Cada combinación sede + tratamiento tiene su propio estado independiente
 * - ✅ Persiste el estado en localStorage para mantener títulos cambiados entre sesiones
 * - ✅ Permite resetear premios reclamados por combinación específica
 * 
 * USO TÍPICO:
 * ```tsx
 * // En una página específica
 * <TitleProvider sede="Jesús María" tratamiento="VPH">
 *   <HeroContact title="¿Tienes verrugas?" subtitle="Podrías tener VPH" />
 *   <SpinWheelTrigger />
 * </TitleProvider>
 * 
 * // En el componente HeroContact
 * const { hasClaimedPrize } = useTitleContext();
 * const displayTitle = hasClaimedPrize ? "¡Felicidades! 🎉" : title;
 * ```
 */

// CONTEXTO GLOBAL PARA MANEJO DE TÍTULO DINÁMICO SEGÚN LA RULETA
// ---------------------------------------------------------------
// Este contexto permite que el título principal de cada landing cambie dinámicamente
// cuando el usuario gana en la ruleta. El estado se guarda en localStorage de forma
// independiente para cada combinación sede + tratamiento.
//
// USO:
// - El provider debe envolver cada página y recibir props de sede y tratamiento.
// - El hook useTitleContext() permite acceder y modificar el estado desde cualquier componente.
// - claimPrize() y resetPrize() afectan solo la combinación actual.

interface TitleContextType {
  /** ¿Se ha reclamado el premio en esta combinación sede + tratamiento? */
  hasClaimedPrize: boolean // ¿Ya reclamó el premio en esta página?
  /** ¿Se ha reclamado el premio en esta combinación sede + tratamiento justo después de ganar? */
  justClaimedPrize: boolean // ¿Se ha reclamado el premio justo después de ganar?
  /** Función para marcar premio como reclamado */
  claimPrize: (sede?: string, tratamiento?: string) => void // Marca como reclamado
  /** Función para resetear el premio reclamado */
  resetPrize: (sede?: string, tratamiento?: string) => void // Resetea el estado
}

interface TitleProviderProps {
  children: ReactNode
  /** Sede actual (ej: "Jesús María", "Golf", "Sur") */
  sede?: string // Sede actual (ej: "Jesús María")
  /** Tratamiento actual (ej: "VPH", "Prostatitis", "Ondas de Choque") */
  tratamiento?: string // Tratamiento actual (ej: "VPH")
}

// Contexto React
const TitleContext = createContext<TitleContextType | undefined>(undefined)

// Provider global para el contexto de título
export function TitleProvider({ children, sede, tratamiento }: TitleProviderProps) {
  const [hasClaimedPrize, setHasClaimedPrize] = useState(false)
  const [justClaimedPrize, setJustClaimedPrize] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  /**
   * 🔑 Genera clave única para localStorage de premios reclamados
   * 
   * FORMATO: "insalud_prize_claimed_{sede}_{tratamiento}"
   * EJEMPLOS:
   * - "insalud_prize_claimed_jesús_maría_vph"
   * - "insalud_prize_claimed_golf_prostatitis"
   * - "insalud_prize_claimed_sur_ondas_de_choque"
   * 
   * NOTA: Separada de la clave de la ruleta para permitir diferentes comportamientos
   */
  const getStorageKey = useCallback((sedeParam?: string, tratamientoParam?: string) => {
    const currentSede = sedeParam || sede || 'default';
    const currentTratamiento = tratamientoParam || tratamiento || 'default';
    return `insalud_prize_claimed_${currentSede.toLowerCase().replace(/\s+/g, '_')}_${currentTratamiento.toLowerCase().replace(/\s+/g, '_')}`;
  }, [sede, tratamiento])

  /**
   * 🔍 Efecto de hidratación - se ejecuta solo en el cliente
   */
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  /**
   * 🔍 Verifica al montar el componente si ya se reclamó el premio
   * 
   * Esto permite que los títulos cambien automáticamente si el usuario
   * ya reclamó el premio en una sesión anterior
   */
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      const key = getStorageKey();
      const claimed = localStorage.getItem(key) === 'true';
      setHasClaimedPrize(claimed);
      setJustClaimedPrize(false); // Solo es true justo después de ganar
    }
  }, [sede, tratamiento, getStorageKey, isHydrated]);

  /**
   * 🏆 Marca el premio como reclamado para una combinación específica
   * 
   * @param sedeParam - Sede específica (opcional, usa la del provider por defecto)
   * @param tratamientoParam - Tratamiento específico (opcional, usa el del provider por defecto)
   */
  const claimPrize = (sedeParam?: string, tratamientoParam?: string) => {
    const key = getStorageKey(sedeParam, tratamientoParam);
    localStorage.setItem(key, 'true');
    setHasClaimedPrize(true);
    setJustClaimedPrize(true); // Solo true inmediatamente después de ganar
  }

  /**
   * 🔄 Resetea el premio reclamado para una combinación específica
   * 
   * @param sedeParam - Sede específica (opcional, usa la del provider por defecto)
   * @param tratamientoParam - Tratamiento específico (opcional, usa el del provider por defecto)
   */
  const resetPrize = (sedeParam?: string, tratamientoParam?: string) => {
    const key = getStorageKey(sedeParam, tratamientoParam);
    localStorage.removeItem(key);
    setHasClaimedPrize(false);
    setJustClaimedPrize(false);
  }

  return (
    <TitleContext.Provider value={{ hasClaimedPrize, justClaimedPrize, claimPrize, resetPrize }}>
      {children}
    </TitleContext.Provider>
  )
}

// Hook para consumir el contexto
export function useTitleContext() {
  const context = useContext(TitleContext)
  if (context === undefined) {
    throw new Error('useTitleContext must be used within a TitleProvider')
  }
  return context
} 