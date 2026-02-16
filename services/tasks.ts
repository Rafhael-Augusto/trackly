import prisma from "@/lib/prisma";
import { Tasks } from "@/types";

export async function getTasks(): Promise<Tasks[]> {
  const tasks = prisma.tasks.findMany();

  return tasks;
}
