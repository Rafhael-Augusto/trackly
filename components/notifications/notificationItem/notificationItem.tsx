"use client";

import { Notification } from "@/app/generated/prisma/client";
import { BellIcon } from "lucide-react";
import { NotificationForm } from "@/components/notifications/notificationForm/notificationForm";
import { useState } from "react";

type Props = {
  data: Notification;
};

export function NotificationItem({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between gap-4 px-4 hover:bg-primary/20 py-2"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-lg p-2 bg-primary/50">
            <BellIcon />
          </div>

          <div>
            <h2 className="font-bold">{data.title}</h2>

            <p className="text-sm text-secondary/50">{data.description}</p>
            <p className="text-sm text-secondary bg-primary p-1 rounded-sm inline">
              {data.time}
            </p>
          </div>
        </div>
      </div>

      <NotificationForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editingData={data}
      />
    </div>
  );
}
