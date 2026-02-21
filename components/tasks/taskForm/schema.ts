import { iconsName } from "@/lib/icons";
import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, "Nome precisa ter pelo menos 3 caracteres"),
  description: z.string(),
  icon: z.enum(iconsName, "Icone invalido"),
  priority: z.enum(["HIGH", "LOW"], "Prioridade invalida"),
  status: z.enum(["DONE", "STARTED", "PENDING"]),
});

export type FormData = z.infer<typeof formSchema>;
