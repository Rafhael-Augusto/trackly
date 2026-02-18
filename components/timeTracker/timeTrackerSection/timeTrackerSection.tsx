import { getMonthYearData } from "@/services/timeTracker";
import { TimeTrackerChart } from "../timeTrackerChart/timeTrackerChart";

export async function TimeTrackerSection() {
  const data = await getMonthYearData();

  return <TimeTrackerChart props={data} />;
}
