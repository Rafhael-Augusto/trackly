import prisma from "@/lib/prisma";

import { Notification, Prisma } from "@/app/generated/prisma/client";

export async function getNotifications(): Promise<Notification[]> {
  return await prisma.notification.findMany();
}

export async function getNotification(
  id: number,
): Promise<Notification | null> {
  return await prisma.notification.findUnique({ where: { id } });
}

export async function createNotification(
  data: Prisma.NotificationCreateInput,
): Promise<Notification> {
  return await prisma.notification.create({ data });
}

export async function updateNotification(
  id: number,
  data: Prisma.NotificationUpdateInput,
): Promise<Notification> {
  return await prisma.notification.update({ where: { id }, data });
}

export async function deleteNotification(id: number): Promise<Notification> {
  return await prisma.notification.delete({ where: { id } });
}
