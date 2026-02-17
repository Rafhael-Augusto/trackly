import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return Response.json([
    {
      title: "Estudar",
      description: "Estudar matematica fudida",
      createdAt: "21/07/2006",
      deadline: "21/07/2006",
      id: 0,
    },
    {
      title: "Estudar",
      description: "Estudar matematica fudida",
      createdAt: "21/07/2006",
      deadline: "21/07/2006",
      id: 1,
    },
  ]);
}
