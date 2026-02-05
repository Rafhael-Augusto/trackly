import { TooltipContentProps } from "recharts";

export const TasksTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<string | number, string>) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-secondary/5 p-4 rounded-md">
      <p className="text-secondary">{label}</p>

      <p className="font-bold text-secondary">
        {payload[0].value} Tarefas Criadas
      </p>
      <p className="font-bold text-secondary">
        {payload[1].value} Tarefas Finalizadas
      </p>
      <p className="font-bold text-secondary">
        {payload[2].value} Tarefas Iniciadas
      </p>
      <p className="font-bold text-secondary">
        {payload[3].value} Tarefas Pendentes
      </p>
    </div>
  );
};
