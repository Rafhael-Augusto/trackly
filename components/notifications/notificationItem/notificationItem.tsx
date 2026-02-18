import Link from "next/link";

import { Notification } from "@/app/generated/prisma/client";

type Props = {
  data: Notification;
};

export function NotificationItem({ data }: Props) {
  return (
    <div className="flex items-center gap-4 px-4 hover:bg-primary/50">
      <div>
        <Link href="/#" className="font-bold ">
          {data.title}
        </Link>
        <p className="text-sm text-secondary/50 ml-2">{data.description}</p>
      </div>
    </div>
  );
}
