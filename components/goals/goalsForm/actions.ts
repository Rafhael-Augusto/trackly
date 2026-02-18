"use server";

import { createGoal } from "@/services/goals";
import { formSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { GoalCreateInput } from "@/app/generated/prisma/models";

export async function createNewGoal(data: GoalCreateInput) {
  const parsed = formSchema.parse(data);

  await createGoal(parsed);

  revalidatePath("/");
  revalidatePath("/goals");
}
