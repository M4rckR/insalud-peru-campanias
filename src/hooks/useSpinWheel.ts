"use client";

import { useSpinWheelOptions } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useSpinWheel = (options: useSpinWheelOptions = {}) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // Corroborar si el usuario ya ha ganado
    const hasUserSpun = useCallback(() => {
        if(typeof window === "undefined") return false;
        return localStorage.getItem('insalud_spin_completed') === 'true';
    }, [])

    // Abrir la ruleta
    useEffect(() => {
        if(hasUserSpun()) return;

        const timer = setTimeout(() => {
            setIsOpen(true);
        }, (options.autoShowDelay || 4) * 1000);

        return () => clearTimeout(timer);
    }, [hasUserSpun, options.autoShowDelay])


    const handleWin = useCallback(() => {
        localStorage.setItem('insalud_spin_completed', 'true');

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

    }, [options, router])
    
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