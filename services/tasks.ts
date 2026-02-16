import { Prisma, Task } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function getTasks(where?: Prisma.TaskWhereInput): Promise<Task[]> {
  return await prisma.task.findMany({ where });
}

export async function getTask(id: number): Promise<Task | null> {
  return await prisma.task.findUnique({
    where: { id },
  });
}

export async function createTask(data: Prisma.TaskCreateInput): Promise<Task> {
  return await prisma.task.create({
    data,
  });
}

export async function updateTask(
  id: number,
  data: Prisma.TaskUpdateInput,
): Promise<Task> {
  return await prisma.task.update({ where: { id }, data });
}
