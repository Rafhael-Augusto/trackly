import prisma from "@/lib/prisma";
import { Goals } from "@/types";

export async function getGoals(): Promise<Goals[]> {
  const goals = await prisma.goals.findMany();

  return goals;
}
