import { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  data: {
    taskName: string;
    taskDescription: string;
    taskIcon: LucideIcon;
  };
};

export function TasksPriorityItem({ data }: Props) {
  return (
    <Card>
      <CardHeader className="h-full">
        <CardTitle>{data.taskName}</CardTitle>
        <CardDescription>{data.taskDescription}</CardDescription>
      </CardHeader>

      <CardContent>
        <data.taskIcon />
      </CardContent>
    </Card>
  );
}
