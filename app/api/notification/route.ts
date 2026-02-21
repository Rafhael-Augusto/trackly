import {
  deleteNotification,
  updateNotification,
} from "@/services/notifications";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  const deleted = await deleteNotification(id);

  return NextResponse.json({ message: "Notificacao deletada", data: deleted });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, time, active, id } = body;

  const data = {
    title,
    description,
    time,
    active,
  };
  const updated = await updateNotification(id, data);

  return NextResponse.json({
    message: "Notificacao atualizada",
    data: updated,
  });
}
