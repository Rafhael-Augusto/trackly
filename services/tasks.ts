import { Prisma, Task } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

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

function countByStatus(tasks: Task[]) {
  return {
    DONE: tasks.filter((t) => t.status === "DONE").length,
    STARTED: tasks.filter((t) => t.status === "STARTED").length,
    PENDING: tasks.filter((t) => t.status === "PENDING").length,
  };
}

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

export async function getMetrics() {
  const now = new Date();

  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  // Tudo
  const allTasks = await getTasks();
  const allCounts = countByStatus(allTasks);

  // Esse mes
  const tasksThisMonth = await getTasks({
    createdAt: {
      gte: startOfThisMonth,
      lt: startOfNextMonth,
    },
  });

  const thisMonthCounts = countByStatus(tasksThisMonth);

  // Mes passado
  const tasksLastMonth = await getTasks({
    createdAt: {
      gte: startOfLastMonth,
      lt: startOfThisMonth,
    },
  });

  const lastMonthCounts = countByStatus(tasksLastMonth);

  return [
    {
      title: "Total de tarefas",
      value: allTasks.length,
      id: 0,
    },
    {
      title: "Tarefas concluidas",
      value: allCounts.DONE,
      monthlyChange: thisMonthCounts.DONE - lastMonthCounts.DONE,
      id: 1,
    },
    {
      title: "Tarefas em andamento",
      value: allCounts.STARTED,
      monthlyChange: thisMonthCounts.STARTED - lastMonthCounts.STARTED,
      id: 2,
    },
    {
      title: "Tarefas pendentes",
      value: allCounts.PENDING,
      monthlyChange: thisMonthCounts.PENDING - lastMonthCounts.PENDING,
      id: 3,
    },
  ];
}

export async function getMonthYearData() {
  const now = new Date();

  // Semanal

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 6);

  const tasks = await getTasks({
    createdAt: { gte: sevenDaysAgo, lte: now },
  });

  const dataWeekly = weekDays.map((day, index) => {
    const tasksOfDay = tasks.filter(
      (task) => task.createdAt.getDay() === index,
    );

    return {
      day,
      tasksCreated: tasksOfDay.length,
      tasksDone: tasksOfDay.filter((t) => t.status === "DONE").length,
      tasksStarted: tasksOfDay.filter((t) => t.status === "STARTED").length,
      tasksPending: tasksOfDay.filter((t) => t.status === "PENDING").length,
    };
  });

  // Mensal

  const allTasks = await getTasks();

  const dataMonthly = months.map((month, index) => {
    const tasksOfMonth = allTasks.filter(
      (task) => task.createdAt.getMonth() === index,
    );

    return {
      month,
      tasksCreated: tasksOfMonth.length,
      tasksDone: tasksOfMonth.filter((t) => t.status === "DONE").length,
      tasksStarted: tasksOfMonth.filter((t) => t.status === "STARTED").length,
      tasksPending: tasksOfMonth.filter((t) => t.status === "PENDING").length,
    };
  });

  return {
    dataWeekly: dataWeekly,
    dataMonthly: dataMonthly,
  };
}

export async function deleteTask(id: number): Promise<Task> {
  return await prisma.task.delete({ where: { id } });
}
