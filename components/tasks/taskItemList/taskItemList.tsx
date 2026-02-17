import { Task } from "@/app/generated/prisma/client";

import { TaskItem } from "@/components/tasks/taskItem/taskItem";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ClipboardListIcon } from "lucide-react";

type Props = {
  data: Task[];
};

export function TaskItemList({ data }: Props) {
  return (
    <div className="bg-primary/95 flex flex-col gap-4 py-2 overflow-y-scroll max-h-72">
      {data.length < 1 && (
        <Empty className="border border-dashed m-4">
          <EmptyHeader>
            <EmptyMedia>
              <ClipboardListIcon />
            </EmptyMedia>
            <EmptyTitle>Nenhuma tarefa</EmptyTitle>
            <EmptyDescription>
              Comece uma nova tarefa clicando no botao &apos;Criar Tarefa&apos;
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {data.map((item) => (
        <TaskItem key={item.id} data={item} />
      ))}
    </div>
  );
}
