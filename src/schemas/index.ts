import { z } from "zod";

export const formLeadsSchema = z.object({
    nombres: z.string().min(1, { message: "El nombre es requerido" }),
    telefono: z.string().min(1, { message: "El teléfono es requerido" }).regex(/^\d+$/, { message: "El teléfono debe ser un número" }),
    turno: z.string().min(1, { message: "El turno es requerido" }),
})

