import { Notification } from "@/app/generated/prisma/client";

import { BellIcon } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { NotificationItem } from "@/components/notifications";

type Props = {
  data: Notification[];
};

export function NotificationItemList({ data }: Props) {
  return (
    <div className="bg-primary/95 flex flex-col gap-4 py-2 overflow-y-scroll max-h-72">
      {data.length < 1 && (
        <Empty className="border border-dashed m-4">
          <EmptyHeader>
            <EmptyMedia>
              <BellIcon />
            </EmptyMedia>
            <EmptyTitle>Nenhuma notificacao</EmptyTitle>
            <EmptyDescription>
              Crie uma nova notificacao clicando no botao &apos;Criar
              Notificacao&apos;
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
