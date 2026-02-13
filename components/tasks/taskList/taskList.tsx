"use client";

import { cn } from "@/lib/utils";

import { useState } from "react";

import {
  BookAIcon,
  CalculatorIcon,
  FolderClosedIcon,
  ShowerHeadIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskItemList, TaskForm } from "@/components/tasks";

const tasksList = [
  {
    title: "Estudar Matematica",
    description: "Estudar multiplicacao",
    icon: CalculatorIcon,
    id: 0,
  },
  {
    title: "Estudar Portugues",
    description: "Estudar linguagens ",
    icon: BookAIcon,
    id: 1,
  },
  {
    title: "Terminar projeto tal",
    description: "Terminar o caraio do projeto",
    icon: FolderClosedIcon,
    id: 2,
  },
  {
    title: "Tomar banho",
    description: "Estudar multiplicacao",
    icon: ShowerHeadIcon,
    id: 3,
  },
  {
    title: "Tomar banho",
    description: "Estudar multiplicacao",
    icon: ShowerHeadIcon,
    id: 4,
  },
];

const buttonsList = [
  {
    label: "Todos",
    value: "all",
    id: 0,
  },
  {
    label: "Concluidos",
    value: "done",
    id: 1,
  },
  {
    label: "Andamento",
    value: "started",
    id: 2,
  },
  {
    label: "Pendentes",
    value: "pending",
    id: 3,
  },
] as const;

type Props = {
  filters?: boolean;
};

type ValueType = (typeof buttonsList)[number]["value"];

export function TaskList({ filters }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState<ValueType>("all");

  return (
    <div>
      <Card className="px-5">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center justify-between">
            <p>Tarefas</p>
            <Button onClick={() => setIsOpen(true)} variant={"secondary"}>
              Criar Tarefa
            </Button>
          </CardTitle>

          {filters && (
            <div>
              <ul>
                {buttonsList.map((item) => (
                  <li
                    key={item.id}
                    className={cn(
                      "inline-block",
                      selectedButton === item.value && "border-b-2",
                    )}
                  >
                    <Button
                      onClick={() => setSelectedButton(item.value)}
                      variant={"default"}
                    >
                      {item.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardHeader>

        <CardContent className="bg-secondary p-0 rounded-2xl">
          <TaskItemList data={tasksList} />
        </CardContent>
      </Card>

      <TaskForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
