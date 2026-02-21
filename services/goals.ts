import prisma from "@/lib/prisma";

import { Goal, Prisma } from "@/app/generated/prisma/client";

export async function getGoals(): Promise<Goal[]> {
  return await prisma.goal.findMany();
}

export async function getGoal(id: number): Promise<Goal | null> {
  return await prisma.goal.findUnique({
    where: { id },
  });
}

export async function createGoal(data: Prisma.GoalCreateInput): Promise<Goal> {
  return await prisma.goal.create({
    data,
  });
}

export async function updateGoal(
  id: number,
  data: Prisma.GoalUpdateInput,
): Promise<Goal> {
  return await prisma.goal.update({ where: { id }, data });
}

export async function deleteGoal(id: number): Promise<Goal> {
  return await prisma.goal.delete({ where: { id } });
}
