import { iconsName } from "@/utils/icons";
import { z } from "zod";

export const formSchema = z.object({
  taskName: z.string().min(3, "Nome precisa ter pelo menos 3 caracteres"),
  taskDescription: z.string(),
  taskIcon: z.enum(iconsName, "Icone invalido"),
});

export type FormData = z.infer<typeof formSchema>;
