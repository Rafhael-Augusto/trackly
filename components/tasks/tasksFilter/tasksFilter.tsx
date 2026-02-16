import { TasksSection } from "@/components/tasks/tasksSection/tasksSection";

export function TasksFilter() {
  return (
    <div className="grid grid-cols-4 my-4">
      <div className="col-span-3">
        <TasksSection filters />
      </div>
    </div>
  );
}
