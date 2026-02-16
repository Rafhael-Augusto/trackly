import prisma from "@/lib/prisma";
import { Prisma, TimeTracker } from "@/app/generated/prisma/client";

export async function getTimeTrackers(): Promise<TimeTracker[]> {
  return prisma.timeTracker.findMany();
}

export async function getTimeTracker(id: number): Promise<TimeTracker | null> {
  return prisma.timeTracker.findUnique({ where: { id } });
}

export async function createTimeTracker(
  data: Prisma.TimeTrackerCreateInput,
): Promise<TimeTracker> {
  return prisma.timeTracker.create({ data });
}

export async function updateTimeTracker(
  id: number,
  data: Prisma.TimeTrackerUpdateInput,
): Promise<TimeTracker> {
  return prisma.timeTracker.update({ where: { id }, data });
}
