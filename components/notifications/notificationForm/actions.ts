"use server";

import { NotificationCreateInput } from "@/app/generated/prisma/models";
import { formSchema } from "./schema";
import { createNotification } from "@/services/notifications";
import { revalidatePath } from "next/cache";

export async function createNewNotification(data: NotificationCreateInput) {
  const parsed = formSchema.parse(data);

  await createNotification(parsed);

  revalidatePath("/notification");
}
