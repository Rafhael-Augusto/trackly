"use client";
import { useState } from "react";

import { Task } from "@/app/generated/prisma/client";
import { iconsMap } from "@/lib/icons";
import { TaskForm } from "../taskForm/taskForm";

type Props = {
  data: Task;
};

export function TaskItem({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = iconsMap[data.icon as keyof typeof iconsMap];

  return (
    <div>
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 px-4 hover:bg-primary/20 py-1"
      >
        <div className="rounded-lg p-2 bg-primary/50">{Icon && <Icon />}</div>
        <div>
          <h2 className="font-bold">{data.title}</h2>
          <p className="text-sm text-secondary/50">{data.description}</p>
        </div>
      </div>

      <TaskForm isOpen={isOpen} setIsOpen={setIsOpen} editingData={data} />
    </div>
  );
}
