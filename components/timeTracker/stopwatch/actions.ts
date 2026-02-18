"use server";

import { createTimeTracker } from "@/services/timeTracker";
import { revalidatePath } from "next/cache";

export async function createNewTime(duration: number) {
  await createTimeTracker({ duration });

  revalidatePath("/");
}
