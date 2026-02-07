import MetricCardList from "@/components/metricCardList/metricCardList";
import TaskList from "@/components/taskList/taskList";
import TasksChart from "@/components/tasksChart/tasksChart";
import TimeTracker from "@/components/timeTracker/timeTracker";
import TimeTrackerChart from "@/components/timeTrackerChart/timeTrackerChart";

export default function Home() {
  return (
    <div className="grid gap-4">
      <MetricCardList />
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3 flex flex-col gap-4">
          <TasksChart />
          <TimeTrackerChart />
        </div>

        <div className="col-start-4 flex flex-col gap-4 ">
          <TaskList />
          <TimeTracker />
        </div>
      </div>
    </div>
  );
}
