import { formLeadsSchema } from "@/schemas";
import { z } from "zod";

export type FormLeads = z.infer<typeof formLeadsSchema>