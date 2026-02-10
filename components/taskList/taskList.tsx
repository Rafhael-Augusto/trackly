"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TaskItem from "../taskItem/taskItem";
import {
  BookAIcon,
  CalculatorIcon,
  FolderClosedIcon,
  ShowerHeadIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import TaskForm from "../taskForm/taskForm";

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

export default function TaskList() {
  const [isOpen, setIsOpen] = useState(false);

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
        </CardHeader>

        <CardContent className="bg-secondary p-0 rounded-2xl">
          <div className="bg-primary/95 flex flex-col gap-4 py-2 overflow-y-scroll max-h-72">
            {tasksList.map((item) => (
              <TaskItem key={item.id} data={item} />
            ))}
          </div>
        </CardContent>
      </Card>

      <TaskForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
