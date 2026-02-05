import MetricCard from "../metricCard/metricCard";

const data = [
  {
    title: "Total de tarefas",
    value: 2,
    monthlyChange: 1,
    goTo: "",
    id: 0,
  },
  {
    title: "Tarefas concluidas",
    value: 0,
    monthlyChange: 0,
    goTo: "",
    id: 1,
  },
  {
    title: "Tarefas em andamento",
    value: 2,
    monthlyChange: 0,
    goTo: "",
    id: 2,
  },
  {
    title: "Tarefas pendentes",
    value: 0,
    monthlyChange: -1,
    goTo: "",
    id: 3,
  },
];

export default function MetricCardList() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {data.map((item) => (
        <MetricCard key={item.id} data={item} />
      ))}
    </div>
  );
}
