"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formLeadsSchema } from "@/schemas";
import { FormLeads } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "lucide-react";
import { useForm } from "react-hook-form";

export const ContactForm = () => {

  const form = useForm<FormLeads>({
    resolver: zodResolver(formLeadsSchema),
    defaultValues: {
      nombres: "",
      telefono: "",
      turno: "",
    },
  });

  function onSubmit(values: FormLeads) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2 bg-white md:bg-transparent p-6 md:p-0 rounded-lg">
          <h2 className="text-center text-2xl font-semibold font-in-poppins text-in-cyan-base md:hidden mb-6">Agenda tu cita ahora y elimina las verrugas sin dañar tu piel.</h2>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="nombres"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="bg-white text-in-blue font-medium placeholder:text-in-blue placeholder:font-medium py-5" {...field} placeholder="Nombres y apellidos" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="bg-white text-in-blue font-medium placeholder:text-in-blue placeholder:font-medium py-5" {...field} placeholder="Celular*" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="turno"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className={`bg-white font-medium py-5 w-full ${fieldState.error ? 'border-red-500 border' : 'border-gray-300'} [&>span]:text-in-blue [&>span]:font-medium`}>
                        <SelectValue placeholder="Elige el turno*" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="text-in-blue hover:!bg-in-cyan hover:!text-in-blue focus:!bg-in-cyan focus:!text-in-blue data-[highlighted]:!bg-in-cyan data-[highlighted]:!text-in-blue" value="mañana">Mañana</SelectItem>
                        <SelectItem className="text-in-blue hover:!bg-in-cyan hover:!text-in-blue focus:!bg-in-cyan focus:!text-in-blue data-[highlighted]:!bg-in-cyan data-[highlighted]:!text-in-blue" value="tarde">Tarde</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-in-orange text-white py-5 cursor-pointer">
              <span className="text-white">
                <div className="flex items-center gap-2">
                  <Calendar />
                  <span>Agendar cita</span>
                </div>
              </span>
            </Button>
          </section>
        </div>

      </form>
    </Form>
  )
}
