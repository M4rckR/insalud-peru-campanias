"use client";

import { useSpinWheelOptions } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useSpinWheel = (options: useSpinWheelOptions = {}) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // Generar clave única para localStorage basada en sede y tratamiento
    const getStorageKey = useCallback(() => {
        const { sede = 'default', tratamiento = 'default' } = options;
        return `insalud_spin_completed_${sede.toLowerCase().replace(/\s+/g, '_')}_${tratamiento.toLowerCase().replace(/\s+/g, '_')}`;
    }, [options]);

    // Corroborar si el usuario ya ha ganado en esta combinación específica
    const hasUserSpun = useCallback(() => {
        if(typeof window === "undefined") return false;
        return localStorage.getItem(getStorageKey()) === 'true';
    }, [getStorageKey])

    // Abrir la ruleta
    useEffect(() => {
        if(hasUserSpun()) return;

        const timer = setTimeout(() => {
            setIsOpen(true);
        }, (options.autoShowDelay || 4) * 1000);

        return () => clearTimeout(timer);
    }, [hasUserSpun, options.autoShowDelay])


    const handleWin = useCallback(() => {
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

    }, [getStorageKey, options, router])
    
    const closeWheel = useCallback(() => {
        setIsOpen(false);
    }, [])

    return {
        isOpen,
        hasUserSpun: hasUserSpun(),
        handleWin,
        closeWheel
    }

}