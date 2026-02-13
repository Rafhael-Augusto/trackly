import { LucideIcon } from "lucide-react";

import { TaskItem } from "@/components/tasks";

type Props = {
  data: {
    title: string;
    description: string;
    icon: LucideIcon;
    id: number;
  }[];
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
