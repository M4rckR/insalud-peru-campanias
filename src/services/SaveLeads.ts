import axios from "axios";
import { LeadType } from "@/types";

export async function saveLead(data: LeadType) {
    const url = process.env.NEXT_PUBLIC_CALLHUB_LEADS_URL || "";

    console.log("Intentando guardar lead en:", url);
    console.log("Datos del lead:", data);

    if (!url) {
        console.error("URL de CallHub no configurada");
        throw new Error("URL de CallHub no configurada");
    }

    try {
        const res = await axios.post(
            url,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            }
        )
        console.log("Lead guardado exitosamente:", res);
    } catch (error) {
        console.error("Error al guardar el lead:", error);
        throw error;
    }
}