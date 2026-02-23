import { ExternalLinkIcon } from "lucide-react";

import { MonthlyChange } from "@/components/misc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  data: {
    title: string;
    value: number;
    monthlyChange?: number;
    id: number;
  };
};

export function MetricCard({ data }: Props) {
  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-4xl font-bold">
        <p>{data.value}</p>
      </CardContent>
      <CardFooter>
        <div>
          {data.monthlyChange !== undefined && (
            <MonthlyChange monthlyChange={data.monthlyChange} />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
