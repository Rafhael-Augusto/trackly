"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function Reminder() {
  useEffect(() => {
    const handleReminder = () => {
      const reminderDescription = "Fazer alguma coisa";
      const audio = new Audio("./notification.mp3");
      audio.volume = 0.01;

      audio.play();
      toast.info("Seu lembrete: ", {
        description: reminderDescription,
        position: "bottom-right",
        className: "text-secondary!",
      });
    };

    handleReminder();
  }, []);
  return null;
}
