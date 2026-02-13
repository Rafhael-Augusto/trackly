import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  data: {
    title: string;
    description: string;
    icon: LucideIcon;
  };
};

export function TaskItem({ data }: Props) {
  return (
    <div className="flex items-center gap-4 px-4">
      <div className="rounded-lg p-2 bg-primary/50">
        <data.icon />
      </div>
      <div>
        <Link href="/#" className="font-bold ">
          {data.title}
        </Link>
        <p className="text-sm text-secondary/50">{data.description}</p>
      </div>
    </div>
  );
}
