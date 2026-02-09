import GoalsList from "@/components/goalsList/goalsList";
import MetricCardList from "@/components/metricCardList/metricCardList";
import TaskList from "@/components/taskList/taskList";
import TasksChart from "@/components/tasksChart/tasksChart";
import TimeTracker from "@/components/timeTracker/timeTracker";
import TimeTrackerChart from "@/components/timeTrackerChart/timeTrackerChart";

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
