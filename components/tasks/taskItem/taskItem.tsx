import Link from "next/link";

import { Task } from "@/app/generated/prisma/client";
import { iconsMap } from "@/lib/icons";

type Props = {
  data: Task;
};

export function TaskItem({ data }: Props) {
  const Icon = iconsMap[data.icon as keyof typeof iconsMap];

  return (
    <div className="flex items-center gap-4 px-4">
      <div className="rounded-lg p-2 bg-primary/50">{Icon && <Icon />}</div>
      <div>
        <Link href="/#" className="font-bold ">
          {data.title}
        </Link>
        <p className="text-sm text-secondary/50">{data.description}</p>
      </div>
    </div>
  );
}
