import { formLeadsSchema } from "@/schemas";
import { z } from "zod";

// ============================================================================
// TIPOS PARA FORMULARIOS Y VALIDACIONES
// ============================================================================

export type FormLeads = z.infer<typeof formLeadsSchema>

// ============================================================================
// TIPOS PARA PREGUNTAS Y RESPUESTAS
// ============================================================================

export type Question = {
  question: string;
  answer: string;
}

// ============================================================================
// TIPOS PARA GESTIÓN DE DATOS DE CONTACTO
// ============================================================================

export interface GestorData {
  gestor: string;
  email: string;
  whatsapp: string;
  message: string;
}

// ============================================================================
// TIPOS PARA DATOS DE SEDES Y UBICACIONES
// ============================================================================

export interface SedeData {
  name: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  socials: {
    instagram: string;
    tiktok: string;
    facebook: string;
  };
  landings: {
    vph?: GestorData;
    ondasChoque?: GestorData;
    prostatitis?: GestorData;
  };
  whatsapp: string;
  whatsappMessages: {
    vph: string;
    disfuncion: string;
    prostatitis: string;
  };
}

// ============================================================================
// TIPOS PARA COMPONENTES DE UI Y TARJETAS
// ============================================================================

export interface CardTreatment {
  title: string;
  description: string;
  image: string;
  alt: string;
  className?: string;
}

// ============================================================================
// TIPOS PARA RULETA
// ============================================================================

export type useSpinWheelOptions = {
  autoShowDelay?: number;
  redirectAfterWin?: string;
  onWin?: () => void;
  /** Sede para generar clave única de localStorage */
  sede?: string;
  /** Tratamiento para generar clave única de localStorage */
  tratamiento?: string;
}

export type SpinWheelProps = {
  isOpen: boolean
  onComplete: () => void
  onClose?: () => void
  wheelSvgPath?: string
  indicatorSvgPath?: string
  spinDuration?: number
  winningAngle?: number
  showCloseButton?: boolean
  /** Ángulo específico para el primer giro (oportunidad) - Opcional */
  firstSpinAngle?: number
  /** Ángulo específico para el segundo giro (premio) - Opcional */
  secondSpinAngle?: number
}

export type SpinWheelTriggerProps = {
  /** Tiempo en segundos antes de mostrar automáticamente la ruleta */
  autoShowDelay?: number
  /** URL a la que redirigir después de ganar */
  redirectAfterWin?: string
  /** Ruta personalizada del SVG de la ruleta */
  wheelSvgPath?: string
  /** Ruta personalizada del SVG del indicador */
  indicatorSvgPath?: string
  /** Duración en segundos de la animación de giro */
  spinDuration?: number
  /** Ángulo de rotación donde debe parar para ganar */
  winningAngle?: number
  /** Si mostrar o no el botón de cerrar */
  showCloseButton?: boolean
  /** Ángulo específico para el primer giro (oportunidad) - Opcional */
  firstSpinAngle?: number
  /** Ángulo específico para el segundo giro (premio) - Opcional */
  secondSpinAngle?: number
  /** Sede para generar clave única de localStorage */
  sede?: string
  /** Tratamiento para generar clave única de localStorage */
  tratamiento?: string
}