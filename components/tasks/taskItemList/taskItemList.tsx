import { Task } from "@/app/generated/prisma/client";

import { TaskItem } from "@/components/tasks/taskItem/taskItem";

type Props = {
  data: Task[];
};

export function TaskItemList({ data }: Props) {
  return (
    <div className="bg-primary/95 flex flex-col gap-4 py-2 overflow-y-scroll max-h-72">
      {data.map((item) => (
        <TaskItem key={item.id} data={item} />
      ))}
    </div>
  );
}
