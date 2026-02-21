import { deleteTask, updateTask } from "@/services/tasks";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  const deleted = await deleteTask(id);

  return NextResponse.json({ message: "Task deletada", data: deleted });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, priority, icon, status, id } = body;

  const data = {
    title,
    description,
    priority,
    icon,
    status,
  };
  const updated = await updateTask(id, data);

  return NextResponse.json({
    message: "Task atualizada",
    data: updated,
  });
}
