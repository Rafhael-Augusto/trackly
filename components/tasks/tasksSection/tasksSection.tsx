import { getTasks } from "@/services/tasks";

import { TaskList } from "@/components/tasks";

type Props = {
  filters?: boolean;
};

export async function TasksSection({ filters }: Props) {
  const data = await getTasks();

  return <TaskList filters={filters} data={data} />;
}
