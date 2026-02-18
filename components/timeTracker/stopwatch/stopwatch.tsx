"use client";

import { useStopwatch } from "@/hooks/useStopwatch";

import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { createNewTime } from "./actions";

export function StopWatch() {
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch();

  const handleClick = () => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  };

  const formatTime = (value: number) => {
    return String(value).padStart(2, "0");
  };

  const handleRegister = () => {
    createNewTime(seconds);
  };

  return (
    <div className="flex flex-col items-center gap-8 bg-secondary/5 p-4 rounded-xl ">
      <div className="text-secondary font-bold text-5xl">
        <span>{formatTime(hours)}:</span>
        <span>{formatTime(minutes)}:</span>
        <span>{formatTime(seconds)}</span>
      </div>

      <div className="flex flex-col items-center gap-4">
        <ButtonGroup>
          <Button variant={"secondary"} onClick={() => handleClick()}>
            {isRunning ? "Pausar" : "Iniciar"}
          </Button>
          <Button variant={"secondary"} onClick={() => reset()}>
            Reiniciar
          </Button>
        </ButtonGroup>

        {seconds > 0 && !isRunning && (
          <Button onClick={() => handleRegister()} variant={"secondary"}>
            Registrar
          </Button>
        )}
      </div>
    </div>
  );
}
