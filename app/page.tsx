import { GoalsList } from "@/components/goals";
import { MetricCardList } from "@/components/metric";
import { TaskList, TasksChart } from "@/components/tasks";
import { TimeTracker, TimeTrackerChart } from "@/components/timeTracker";

export default function Home() {
  return (
    <div className="grid gap-4">
      <div className="grid h-fit">
        <MetricCardList />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col justify-between gap-4 col-span-3 h-full">
          <TasksChart />
          <TimeTrackerChart />
          <GoalsList />
        </div>

        <div className="col-start-4 flex flex-col gap-4">
          <TaskList />
          <TimeTracker />
        </div>
      </div>
    </div>
  );
}
