"use client";

import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { TasksTooltip } from "../customTooltip/tasksTooltip";

const data = [
  {
    day: "Segunda",
    tasksCreated: 5,
    tasksDone: 0,
    tasksStarted: 3,
    tasksPending: 5,
  },
  {
    day: "Terca",
    tasksCreated: 0,
    tasksDone: 2,
    tasksStarted: 2,
    tasksPending: 3,
  },
  {
    day: "Quarta",
    tasksCreated: 0,
    tasksDone: 5,
    tasksStarted: 3,
    tasksPending: 0,
  },
  {
    day: "Quinta",
    tasksCreated: 5,
    tasksDone: 0,
    tasksStarted: 3,
    tasksPending: 5,
  },
  {
    day: "Sexta",
    tasksCreated: 0,
    tasksDone: 2,
    tasksStarted: 2,
    tasksPending: 3,
  },
  {
    day: "Sabado",
    tasksCreated: 0,
    tasksDone: 5,
    tasksStarted: 3,
    tasksPending: 0,
  },
  {
    day: "Domingo",
    tasksCreated: 0,
    tasksDone: 0,
    tasksStarted: 0,
    tasksPending: 0,
  },
];

export default function TasksChart() {
  const charData = data.map((item) => ({
    day: item.day,
    "Tarefas Criadas": item.tasksCreated,
    "Tarefas Concluidas": item.tasksDone,
    "Tarefas Pendentes": item.tasksStarted,
    "Tarefas Iniciadas": item.tasksPending,
  }));

  return (
    <div className="bg-primary rounded-xl pr-4 pt-4 h-1/2">
      <LineChart responsive data={charData} className="w-full h-full">
        <Line type="monotone" dataKey="Tarefas Criadas" stroke="#3b82f6" />
        <Line type="monotone" dataKey="Tarefas Concluidas" stroke="#22c55e" />
        <Line type="monotone" dataKey="Tarefas Pendentes" stroke="#f59e0b" />
        <Line type="monotone" dataKey="Tarefas Iniciadas" stroke="#ef4444" />
        <Legend align="center" />
        <Tooltip content={TasksTooltip} />
        <XAxis dataKey="day" />
        <YAxis
          label={{ value: "Tarefas", position: "insideLeft", angle: -90 }}
        />
      </LineChart>
    </div>
  );
}
