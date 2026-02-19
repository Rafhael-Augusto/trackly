import { Task } from "@/app/generated/prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { findIcon } from "@/utils/icons";

type Props = {
  data: Task;
};

export function TasksPriorityItem({ data }: Props) {
  const Icon = findIcon(data.icon);

  return (
    <Card>
      <CardHeader className="h-full">
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>

      <CardContent>{Icon && <Icon />}</CardContent>
    </Card>
  );
}
