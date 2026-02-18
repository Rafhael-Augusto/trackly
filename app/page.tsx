import { GoalsSection } from "@/components/goals/goalsSection/goalsSection";
import { MetricCardList } from "@/components/metric";
import { TasksChartSection } from "@/components/tasks/tasksChartSection/tasksChartSection";
import { TasksSection } from "@/components/tasks/tasksSection/tasksSection";
import { TimeTrackerSection } from "@/components/timeTracker/timeTrackerSection/timeTrackerSection";

export default function Home() {
  return (
    <div className="grid gap-4">
      <div className="grid h-fit">
        <MetricCardList />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col justify-between gap-4 col-span-3 h-full">
          <TasksChartSection />
          <TimeTrackerSection />
          <GoalsSection />
        </div>

        <div className="col-start-4 flex flex-col gap-4">
          <TasksSection />
        </div>
      </div>
    </div>
  );
}
