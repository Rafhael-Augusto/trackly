"use client";

import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { useStopwatch } from "@/hooks/useStopwatch";

export default function StopWatch() {
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
          <Button variant={"secondary"}>Registrar</Button>
        )}
      </div>
    </div>
  );
}
