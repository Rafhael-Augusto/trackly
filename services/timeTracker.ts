import prisma from "@/lib/prisma";
import { Prisma, TimeTracker } from "@/app/generated/prisma/client";

function secondsToHMS(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
}

const weekDays = [
  "Domingo",
  "Segunda",
  "Terca",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sabado",
];

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export async function getTimeTrackers(
  where?: Prisma.TimeTrackerWhereInput,
): Promise<TimeTracker[]> {
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

export async function getMonthYearData() {
  const now = new Date();

  // Semanal

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 6);

  const records = await getTimeTrackers({
    createdAt: { gte: sevenDaysAgo, lte: now },
  });

  const dataWeekly = weekDays.map((day, index) => {
    const totalSeconds = records
      .filter((r) => r.createdAt.getDay() === index)
      .reduce((acc, r) => acc + r.duration, 0);

    return {
      day,
      ...secondsToHMS(totalSeconds),
    };
  });

  // Mensal

  const allRecords = await getTimeTrackers();

  const dataMonthly = months.map((month, index) => {
    const totalSeconds = allRecords
      .filter((r) => r.createdAt.getMonth() === index)
      .reduce((acc, r) => acc + r.duration, 0);

    return {
      month,
      ...secondsToHMS(totalSeconds),
    };
  });

  return {
    dataWeekly: dataWeekly,
    dataMonthly: dataMonthly,
  };
}
