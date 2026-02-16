import { Prisma, TaskStatus } from "@/app/generated/prisma/client";

import { getTasks } from "@/services/tasks";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title");
  const status = searchParams.get("status");

  const where: Prisma.TaskWhereInput = {};

  if (title) {
    where.title = {
      contains: title,
      mode: "insensitive",
    };
  }

  if (status && Object.values(TaskStatus).includes(status as TaskStatus)) {
    where.status = status as TaskStatus;
  }

  const goals = await getTasks(where);

  return NextResponse.json(goals);
}
