"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormLeads } from "@/types";
import { formLeadsSchema } from "@/schemas";
import { GestorData } from "@/types";

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