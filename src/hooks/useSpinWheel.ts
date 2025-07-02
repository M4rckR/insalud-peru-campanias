"use client";

import { useSpinWheelOptions } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

/**
 * 🎰 Hook personalizado para manejar la lógica de la ruleta de premios
 * 
 * CARACTERÍSTICAS PRINCIPALES:
 * - ✅ Cada combinación sede + tratamiento tiene su propio localStorage independiente
 * - ✅ Auto-show configurable con delay personalizable
 * - ✅ Previene múltiples participaciones en la misma combinación
 * - ✅ Redirección opcional después de ganar
 * 
 * EJEMPLOS DE USO:
 * ```tsx
 * // Ruleta para VPH en Jesús María
 * const { isOpen, hasUserSpun, handleWin, closeWheel } = useSpinWheel({
 *   autoShowDelay: 3,
 *   sede: "Jesús María",
 *   tratamiento: "VPH"
 * });
 * 
 * // Ruleta para Prostatitis en Golf
 * const { isOpen, hasUserSpun, handleWin, closeWheel } = useSpinWheel({
 *   autoShowDelay: 2,
 *   sede: "Golf", 
 *   tratamiento: "Prostatitis"
 * });
 * ```
 * 
 * @param options - Configuraciones para la ruleta
 * @returns Estados y funciones para controlar la ruleta
 */
export const useSpinWheel = (options: useSpinWheelOptions = {}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const router = useRouter();

    // Efecto de hidratación
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    /**
     * 🔑 Genera clave única para localStorage basada en sede y tratamiento
     * 
     * FORMATO: "insalud_spin_completed_{sede}_{tratamiento}"
     * EJEMPLOS:
     * - "insalud_spin_completed_jesús_maría_vph"
     * - "insalud_spin_completed_golf_prostatitis"
     * - "insalud_spin_completed_sur_ondas_de_choque"
     * 
     * Esto permite que cada página tenga su propia ruleta independiente
     */
    const getStorageKey = useCallback(() => {
        const { sede = 'default', tratamiento = 'default' } = options;
        return `insalud_spin_completed_${sede.toLowerCase().replace(/\s+/g, '_')}_${tratamiento.toLowerCase().replace(/\s+/g, '_')}`;
    }, [options]);

    /**
     * 🎯 Verifica si el usuario ya participó en esta combinación específica
     * 
     * @returns true si ya ganó en esta sede + tratamiento, false en caso contrario
     */
    const hasUserSpun = useCallback(() => {
        if(!isHydrated || typeof window === "undefined") return false;
        return localStorage.getItem(getStorageKey()) === 'true';
    }, [getStorageKey, isHydrated])

    /**
     * ⏰ Efecto para mostrar automáticamente la ruleta después del delay configurado
     * 
     * - Solo se ejecuta si el usuario NO ha participado antes en esta combinación
     * - El delay es configurable (por defecto 4 segundos)
     * - Se limpia el timer si el componente se desmonta
     */
    useEffect(() => {
        if(!isHydrated || hasUserSpun()) return;

        const timer = setTimeout(() => {
            setIsOpen(true);
        }, (options.autoShowDelay || 4) * 1000);

        return () => clearTimeout(timer);
    }, [hasUserSpun, options.autoShowDelay, isHydrated])

    /**
     * 🏆 Maneja cuando el usuario gana en la ruleta
     * 
     * ACCIONES:
     * 1. Marca como "completado" en localStorage para esta combinación específica
     * 2. Ejecuta callback personalizado si existe
     * 3. Cierra la ruleta después de un tiempo
     * 4. Redirige si se especificó una URL de redirección
     * 
     * IMPORTANTE: Solo afecta a la combinación actual (sede + tratamiento)
     */
    const handleWin = useCallback(() => {
        if (!isHydrated || typeof window === "undefined") return;
        
        localStorage.setItem(getStorageKey(), 'true');

        // Callback personalizado si existe
        options.onWin?.()

        setTimeout(() => {
            setIsOpen(false);

            const { redirectAfterWin } = options
            if(redirectAfterWin){
                setTimeout(() => {
                    router.push(redirectAfterWin)
                }, 500)
            }
        }, 20000000)

    }, [getStorageKey, options, router, isHydrated])
    
    /**
     * ❌ Cierra la ruleta manualmente
     */
    const closeWheel = useCallback(() => {
        setIsOpen(false);
    }, [])

    return {
        isOpen,        // ¿Está la ruleta visible?
        hasUserSpun: hasUserSpun(), // ¿Ya participó en esta combinación?
        handleWin,     // Función para manejar la victoria
        closeWheel     // Función para cerrar manualmente
    }

}