"use server";

import {
  TaskCreateInput,
  TaskUpdateInput,
} from "@/app/generated/prisma/models";
import { formSchema } from "./schema";
import { createTask, updateTask } from "@/services/tasks";
import { revalidatePath } from "next/cache";

export async function createNewTask(data: TaskCreateInput) {
  const parsed = formSchema.parse(data);

  await createTask(parsed);

  revalidatePath("/");
  revalidatePath("/tasks");
}
