import { z } from "zod";

export const formSchema = z.object({
  goalName: z
    .string()
    .min(3, "Nome da tarefa precisa ter pelo menos 3 caracteres"),
  goalDescription: z.string(),
  date: z.date("Selecione uma data valida"),
});

export type FormData = z.infer<typeof formSchema>;
