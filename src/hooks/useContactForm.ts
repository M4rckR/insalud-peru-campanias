"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormLeads } from "@/types";
import { formLeadsSchema } from "@/schemas";
import { GestorData } from "@/types";
import { saveLead } from "@/services/SaveLeads";

interface UseContactFormProps {
  gestorData?: GestorData;
  tratamiento: string;
  sede: string;
}

export const useContactForm = ({ gestorData, tratamiento, sede }: UseContactFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormLeads>({
    resolver: zodResolver(formLeadsSchema),
    defaultValues: {
      nombres: "",
      telefono: "",
      turno: "",
      gestorEmail: gestorData?.email,
      gestorNombre: gestorData?.gestor,
      tratamiento: tratamiento,
      sede: sede,
    },
  });

  const onSubmit = async (values: FormLeads) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          gestorEmail: gestorData?.email,
          gestorNombre: gestorData?.gestor,
          tratamiento: tratamiento,
          sede: sede,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Correo enviado a ${gestorData?.gestor || 'nuestro equipo'} - Nos contactaremos contigo pronto`);
        form.reset();

        // Save lead to external service
        console.log("Intentando guardar lead...");
        try {
          await saveLead({
            id_lead_source: 1,
            name: values.nombres,
            email: 'Sin email',
            phone: `51${values.telefono}`,
            reason: tratamiento || '',
            sede: sede || '',
            date: new Date().toISOString(),
            url: `https://app.insalud.pe${typeof window !== 'undefined' ? window.location.pathname : ''}`,
            id_announcement: '',
          });
        } catch (saveError) {
          console.error('Error saving lead to external service:', saveError);
          // Don't show error to user as the main submission succeeded
        }
      } else {
        toast.error(data.mensaje || "Error al enviar el formulario");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error al enviar el formulario");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    onSubmit
  };
}; 