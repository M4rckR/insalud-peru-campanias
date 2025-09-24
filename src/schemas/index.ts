// Schema for validating lead form submissions
import { z } from "zod";

export const formLeadsSchema = z.object({
    // Full name validation: required, no leading/trailing spaces, allows single names or names with spaces
    nombres: z.string()
        .min(1, { message: "El nombre es requerido" })
        .regex(/^\S.*\S$|^\S$/, { message: "Ingrese un nombre válido" })
        .regex(/^[^\s]*(\s[^\s]+)*$/, { message: "Ingrese un nombre válido" }),
    // Phone number validation: required, exactly 9 digits, must start with 9 (Peruvian mobile)
    telefono: z.string()
        .min(1, { message: "El teléfono es requerido" })
        .regex(/^\d+$/, { message: "Solo se permiten números" })
        .min(9, { message: "Debe tener 9 dígitos" })
        .max(9, { message: "Debe tener 9 dígitos" })
        .regex(/^9\d{8}$/, { message: "Debe iniciar con 9 (celular peruano)" }),
    // Appointment shift: required
    turno: z.string().min(1, { message: "El turno es requerido" }),
    // Optional fields for manager/gestor data
    gestorEmail: z.string().optional(),
    gestorNombre: z.string().optional(),
    tratamiento: z.string().optional(),
    sede: z.string().optional(),
})

export const leadsSchema = z.object({
    id_lead_source: z.number(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    reason: z.string().optional(),
    sede: z.string().optional(),
    date: z.string().optional(),
    url: z.string(),
    id_announcement: z.string().optional(), // ID del anuncio
});

