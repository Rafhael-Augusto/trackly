import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, "Nome precisa ter pelo menos 3 caracteres"),
  description: z.string(),
  deadline: z.date("Selecione uma data valida"),
});

export type FormData = z.infer<typeof formSchema>;
