"use client";

import { SwitchField } from "@/components/misc";
import { useTimeTrackerContext } from "@/components/timeTracker";

export function StopwatchSwitch() {
  const { isOpen, setIsOpen } = useTimeTrackerContext();

  const title = "Timer persistente";
  const description =
    "Quando ativado, voce consegue um timer persistente entre paginas";

  const data = {
    title,
    description,
    isOpen,
    setIsOpen,
  };

  return <SwitchField data={data} />;
}
