"use client";

import { useState } from "react";

import { Notification } from "@/app/generated/prisma/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  NotificationForm,
  NotificationItemList,
} from "@/components/notifications";

type Props = {
  data: Notification[];
};

export function NotificationList({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Card className="px-5">
        <CardHeader className="p-0">
          <CardTitle className={"flex items-center justify-between"}>
            <p>Notificacoes</p>
            <Button onClick={() => setIsOpen(true)} variant={"secondary"}>
              Criar Notificacao
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="bg-secondary p-0 rounded-2xl">
          <NotificationItemList data={data} />
        </CardContent>
      </Card>

      <NotificationForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
