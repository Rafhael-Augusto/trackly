import { TooltipContentProps } from "recharts";

const daysMap = {
  Seg: "Segunda",
  Ter: "Terca",
  Qua: "Quarta",
  Qui: "Quinta",
  Sex: "Sexta",
  Sab: "Sabado",
  Dom: "Domingo",
};

export const TimeTrackerTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<string | number, string>) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-secondary/5 p-4 rounded-md">
      <p className="text-secondary">
        {daysMap[label as keyof typeof daysMap] ?? label}
      </p>
      <p className="font-bold text-secondary">{payload[0].value} minutos</p>
    </div>
  );
};
