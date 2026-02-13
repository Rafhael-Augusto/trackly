import { TaskList } from "@/components/tasks";

export function TasksFilter() {
  return (
    <div className="grid grid-cols-4 my-4">
      <div className="col-span-3">
        <TaskList filters />
      </div>
    </div>
  );
}
