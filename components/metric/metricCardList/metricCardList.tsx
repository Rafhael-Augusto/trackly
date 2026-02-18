import { MetricCard } from "@/components/metric";
import { getMetrics } from "@/services/tasks";

export async function MetricCardList() {
  const data = await getMetrics();

  return (
    <div className="grid grid-cols-4 gap-4 ">
      {data.map((item) => (
        <MetricCard key={item.id} data={item} />
      ))}
    </div>
  );
}
