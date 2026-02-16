import { TasksFilter } from "@/components/tasks/tasksFilter/tasksFilter";
import { TasksPriorityList } from "@/components/tasks/tasksPriorityList/tasksPriorityList";

export default function Tasks() {
  return (
    <div>
      <TasksPriorityList />
      <TasksFilter />
    </div>
  );
}
