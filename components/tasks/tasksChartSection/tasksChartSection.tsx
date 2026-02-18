import { TasksChart } from "@/components/tasks/tasksChart/tasksChart";
import { getMonthYearData } from "@/services/tasks";

export async function TasksChartSection() {
  const data = await getMonthYearData();

  return <TasksChart props={data} />;
}
