import { Badge } from "@/components/ui/badge";

type Props = {
  monthlyChange: number;
};

const getTrend = (value: number) => {
  if (value === 0) return "neutral";
  if (value > 0) return "positive";
  return "negative";
};

const trendMap = {
  positive: {
    description: "Aumento em relacao ao mes passado",
  },
  neutral: {
    description: "Sem mudancas",
  },
  negative: {
    description: "Reducao em relacao ao mes passado",
  },
};

export function MonthlyChange({ monthlyChange }: Props) {
  const trend = getTrend(monthlyChange);

  return (
    <div>
      <Badge className="border border-secondary/20 ">
        <div className="flex items-center">
          <p className="text-secondary font-extrabold">
            {Math.abs(monthlyChange)}
          </p>
        </div>
        <p>{trendMap[trend].description}</p>
      </Badge>
    </div>
  );
}
