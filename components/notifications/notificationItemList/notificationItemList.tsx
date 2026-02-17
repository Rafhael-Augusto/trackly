import { Task } from "@/app/generated/prisma/client";

import { ClipboardListIcon } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { NotificationItem } from "@/components/notifications";

type Props = {
  data: Task[];
};

export function NotificationItemList({ data }: Props) {
  return (
    <div className="bg-primary/95 flex flex-col gap-4 py-2 overflow-y-scroll max-h-72">
      {data.length < 1 && (
        <Empty className="border border-dashed m-4">
          <EmptyHeader>
            <EmptyMedia>
              <ClipboardListIcon />
            </EmptyMedia>
            <EmptyTitle>Nenhuma notificacao</EmptyTitle>
            <EmptyDescription>
              Crie uma nova notificacao clicando no botao 'Nova Notificacao'
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {data.map((item) => (
        <NotificationItem key={item.id} data={item} />
      ))}
    </div>
  );
}
