"use client";

import { useMemo, useState } from "react";

import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CustomToolTip } from "@/components/misc";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartMap = [
  {
    label: "created",
    value: "Tarefas Criadas",
    stroke: "#3b82f6",
  },
  {
    label: "done",
    value: "Tarefas Concluidas",
    stroke: "#22c55e",
  },
  {
    label: "pending",
    value: "Tarefas Pendentes",
    stroke: "#f59e0b",
  },
  {
    label: "started",
    value: "Tarefas Iniciadas",
    stroke: "#ef4444",
  },
];

type Period = "weekly" | "monthly";
type Lines = "all" | "created" | "done" | "pending" | "started";

type PropsData = {
  tasksCreated: number;
  tasksDone: number;
  tasksStarted: number;
  tasksPending: number;
};

type WeeklyData = {
  day: string;
} & PropsData;

type MonthlyData = {
  month: string;
} & PropsData;

type Props = {
  props: {
    dataWeekly: WeeklyData[];
    dataMonthly: MonthlyData[];
  };
};

type UpdatedData = {
  label?: string;
  "Tarefas Criadas"?: number;
  "Tarefas Concluidas"?: number;
  "Tarefas Pendentes"?: number;
  "Tarefas Iniciadas"?: number;
};

export function TasksChart({ props }: Props) {
  const [period, setPeriod] = useState<Period>("weekly");
  const [lines, setLines] = useState<Lines>("done");

  const [data, setData] = useState<WeeklyData[] | MonthlyData[]>(
    props.dataWeekly,
  );

  const handleDataChange = (value: Period) => {
    const dataMap = {
      monthly: props.dataMonthly,
      weekly: props.dataWeekly,
    };

    setData(dataMap[value]);
    setPeriod(value);
  };

  const modifyData = (baseData: UpdatedData[], value: Lines): UpdatedData[] => {
    const modifyDataMap = {
      all: baseData,
      created: baseData.map((item) => ({
        label: item.label,
        "Tarefas Criadas": item["Tarefas Criadas"],
      })),
      done: baseData.map((item) => ({
        label: item.label,
        "Tarefas Concluidas": item["Tarefas Concluidas"],
      })),
      pending: baseData.map((item) => ({
        label: item.label,
        "Tarefas Pendentes": item["Tarefas Pendentes"],
      })),
      started: baseData.map((item) => ({
        label: item.label,
        "Tarefas Iniciadas": item["Tarefas Iniciadas"],
      })),
    };

    return modifyDataMap[value];
  };

  const newChartData = (data: WeeklyData[] | MonthlyData[]): UpdatedData[] => {
    const newDataArray = data.map((item) => {
      const label = "day" in item ? item.day : item.month.slice(0, 3);

      return {
        label: label,
        "Tarefas Criadas": item.tasksCreated,
        "Tarefas Concluidas": item.tasksDone,
        "Tarefas Pendentes": item.tasksPending,
        "Tarefas Iniciadas": item.tasksStarted,
      };
    });

    return newDataArray;
  };

  const updatedData = useMemo(() => {
    const baseData = newChartData(data);
    return modifyData(baseData, lines);
  }, [data, lines]);

  return (
    <div className="flex flex-col items-end bg-primary rounded-xl pr-4 pt-4 w-full h-80">
      <div className="flex text-secondary gap-4">
        <Select
          onValueChange={(value) => handleDataChange(value as Period)}
          value={period}
        >
          <SelectTrigger className="border-0 bg-secondary/5">
            <SelectValue placeholder="Selecione o periodo" />
          </SelectTrigger>

          <SelectContent className="bg-primary text-secondary border-0">
            <SelectGroup>
              <SelectLabel>Periodo</SelectLabel>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => setLines(value as Lines)}
          value={lines}
        >
          <SelectTrigger className="border-0 bg-secondary/5">
            <SelectValue placeholder="Selecione o dado" />
          </SelectTrigger>

          <SelectContent className="bg-primary text-secondary border-0">
            <SelectGroup>
              <SelectLabel>Linhas</SelectLabel>
              <SelectItem value="all">Todas as tarefas</SelectItem>
              <SelectItem value="created">Tarefas Criadas</SelectItem>
              <SelectItem value="done">Tarefas Concluidas</SelectItem>
              <SelectItem value="pending">Tarefas Pendentes</SelectItem>
              <SelectItem value="started">Tarefas Iniciadas</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer height={"100%"} width={"100%"}>
        <LineChart data={updatedData} className="w-full h-full">
          {chartMap.map((item) => {
            if (lines === "all" || lines === item.label) {
              return (
                <Line
                  key={item.label}
                  type="monotone"
                  dataKey={item.value}
                  stroke={item.stroke}
                />
              );
            }
          })}
          <Legend align="center" />
          <Tooltip content={CustomToolTip} />
          <XAxis dataKey="label" />
          <YAxis
            label={{ value: "Tarefas", position: "insideLeft", angle: -90 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
