import { formLeadsSchema } from "@/schemas";
import { z } from "zod";

export type FormLeads = z.infer<typeof formLeadsSchema>

export type Question = {
  question: string;
  answer: string;
}

export interface GestorData {
  gestor: string;
  email: string;
  whatsapp: string;
  message: string;
}

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

export interface CardTreatment {
  title: string;
  description: string;
  image: string;
  alt: string;
  className?: string;
}