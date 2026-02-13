import { FlowerIcon } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { Field, FieldLabel } from "@/components/ui/field";

import { TasksPriorityItem } from "@/components/tasks";

const cards = [
  {
    taskName: "Estudar Matematica",
    taskDescription: "Estudar multiplicacao",
    taskIcon: FlowerIcon,
    id: 0,
  },
  {
    taskName: "Estudar Portugues",
    taskDescription: "Estudar linguagens",
    taskIcon: FlowerIcon,
    id: 1,
  },
  {
    taskName: "Terminar projeto tal",
    taskDescription: "Terminar o projeto",
    taskIcon: FlowerIcon,
    id: 2,
  },
];

export function TasksPriorityList() {
  return (
    <div>
      <Field className="mb-8 w-1/5">
        <FieldLabel className="text-lg">
          <span>Progresso total</span>
          <span className="ml-auto">10%</span>
        </FieldLabel>
        <Progress value={10} />
      </Field>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((item) => (
          <TasksPriorityItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
