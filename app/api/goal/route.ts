import { deleteGoal, updateGoal } from "@/services/goals";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  const deleted = await deleteGoal(id);

  return NextResponse.json({ message: "Meta deletada", data: deleted });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, date, id } = body;

  const data = {
    title,
    description,
    date,
  };
  const updated = await updateGoal(id, data);

  return NextResponse.json({
    message: "Meta atualizada",
    data: updated,
  });
}
