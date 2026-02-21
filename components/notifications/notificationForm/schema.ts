import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, "Nome precisa ter pelo menos 3 caracteres"),
  description: z.string(),
  time: z.string().min(5, "Horario obrigatorio"),
  active: z.boolean(),
});

export type FormData = z.infer<typeof formSchema>;
