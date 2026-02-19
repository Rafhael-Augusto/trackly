import { FlowerIcon } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { Field, FieldLabel } from "@/components/ui/field";

import { TasksPriorityItem } from "@/components/tasks";
import { getTasks } from "@/services/tasks";

export async function TasksPriorityList() {
  const dataHighPriority = await getTasks({ priority: "HIGH" });

  const data = await getTasks();
  const dataTaskDone = await getTasks({ status: "DONE" });

  const percentage = Math.round((dataTaskDone.length / data.length) * 100);

  return (
    <div>
      <Field className="mb-8 w-1/5">
        <FieldLabel className="text-lg">
          <span>Progresso total</span>
          <span className="ml-auto">
            {Number.isNaN(percentage) ? 0 : percentage}%
          </span>
        </FieldLabel>
        <Progress value={percentage} />
      </Field>

      <div className="grid grid-cols-4 gap-4">
        {dataHighPriority.map((item) => (
          <TasksPriorityItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
