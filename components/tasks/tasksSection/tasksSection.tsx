import { TaskList } from "@/components/tasks";
import { Tasks } from "@/types";

type Props = {
  filters?: boolean;
};

export async function TasksSection({ filters }: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tasks`);
  const data: Tasks[] = await res.json();

  return <TaskList filters={filters} data={data} />;
}
