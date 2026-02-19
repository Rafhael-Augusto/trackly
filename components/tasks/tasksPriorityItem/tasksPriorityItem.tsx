import { Task } from "@/app/generated/prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { iconsMap } from "@/lib/icons";

type Props = {
  data: Task;
};

export function TasksPriorityItem({ data }: Props) {
  const Icon = iconsMap[data.icon as keyof typeof iconsMap];

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
