import { z } from "zod";

export const formSchema = z.object({
  notificationName: z
    .string()
    .min(3, "Nome precisa ter pelo menos 3 caracteres"),
  notificationDesc: z.string(),
});

export type FormData = z.infer<typeof formSchema>;
