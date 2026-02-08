import { TooltipContentProps } from "recharts";

export const CustomToolTip = ({
  active,
  payload,
  label,
}: TooltipContentProps<string | number, string>) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-secondary/5 p-4 rounded-md">
      <p className="text-secondary">{label}</p>

      {payload.map((item) => (
        <p key={item.name} className="font-bold text-secondary">
          {item.value} {item.name}
        </p>
      ))}
    </div>
  );
};
