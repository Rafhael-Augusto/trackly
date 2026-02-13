"use client";

import { TasksFilter, TasksPriorityList } from "@/components/tasks";

export default function Tasks() {
  return (
    <div>
      <TasksPriorityList />
      <TasksFilter />
    </div>
  );
}
