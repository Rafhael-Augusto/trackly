"use client";

import { useEffect, useState } from "react";

import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Task } from "@/app/generated/prisma/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { TaskItemList } from "@/components/tasks/taskItemList/taskItemList";
import { TaskForm } from "@/components/tasks/taskForm/taskForm";

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
  data: Task[];
};

type ValueType = (typeof buttonsList)[number]["value"];

const statusMap: Record<ValueType, string | null> = {
  all: null,
  done: "DONE",
  started: "STARTED",
  pending: "PENDING",
};

export function TaskList({ filters, data }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState<ValueType>("all");

  const status = statusMap[selectedButton];

  const filteredTasks = status
    ? data.filter((item) => item.status === status)
    : data;

  return (
    <div>
      <Card className="px-5">
        <CardHeader className="p-0">
          <CardTitle
            className={cn(
              "flex items-center justify-between",
              filters && "justify-start gap-8",
            )}
          >
            <p>Tarefas</p>
            <Button onClick={() => setIsOpen(true)} variant={"secondary"}>
              Criar Tarefa
            </Button>
          </CardTitle>

          {filters && (
            <div className="flex items-center justify-between mt-4">
              <ul className="flex items-center gap-8">
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

              <InputGroup className="w-1/5 bg-secondary/5 border-0">
                <InputGroupInput type="search" placeholder="Pesquisar..." />

                <InputGroupAddon align="inline-end">
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>
            </div>
          )}
        </CardHeader>

        <CardContent className="bg-secondary p-0 rounded-2xl">
          <TaskItemList data={filteredTasks} />
        </CardContent>
      </Card>

      <TaskForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
