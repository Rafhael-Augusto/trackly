"use client";

import { useMemo, useState } from "react";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CustomToolTip } from "@/components/misc/customTooltip/customTooltip";

const dataWeekly = [
  { day: "Segunda", hours: 1, minutes: 31, seconds: 2 },
  { day: "Terca", hours: 2, minutes: 15, seconds: 30 },
  { day: "Quarta", hours: 0, minutes: 45, seconds: 0 },
  { day: "Quinta", hours: 0, minutes: 15, seconds: 0 },
  { day: "Sexta", hours: 1, minutes: 45, seconds: 0 },
  { day: "Sabado", hours: 0, minutes: 25, seconds: 40 },
  { day: "Domingo", hours: 0, minutes: 55, seconds: 38 },
];

const dataMonthly = [
  {
    month: "Janeiro",
    hours: 30,
    minutes: 31,
    seconds: 2,
  },
  {
    month: "Fevereiro",
    hours: 15,
    minutes: 3,
    seconds: 2,
  },
];

type Period = "weekly" | "monthly";

type Data = (typeof dataWeekly)[number] | (typeof dataMonthly)[number];
type UpdatedData = {
  label?: string;
  horas?: number;
};

export function TimeTrackerChart() {
  const [period, setPeriod] = useState("weekly");

  const [data, setData] = useState<Data[]>(dataWeekly);

  const newChartData = (data: Data[]): UpdatedData[] => {
    const newDataArray = data.map((item) => {
      const label = "day" in item ? item.day : item.month;

      return {
        label: label,
        horas: +(item.hours + item.minutes / 60 + item.seconds / 3600).toFixed(
          2,
        ),
      };
    });

    return newDataArray;
  };

  const handleDataChange = (value: Period) => {
    const dataMap = {
      monthly: dataMonthly,
      weekly: dataWeekly,
    };

    setData(dataMap[value]);
    setPeriod(value);
  };

  const updatedData = useMemo(() => {
    return newChartData(data);
  }, [data]);

  return (
    <div className="flex flex-col items-end bg-primary rounded-xl pr-4 pt-4 w-full h-80">
      <div className="text-secondary">
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
      </div>

      <ResponsiveContainer height={"100%"} width={"100%"}>
        <LineChart data={updatedData} className="w-full h-full">
          <Line type="monotone" dataKey="horas" />
          <Tooltip content={CustomToolTip} />
          <XAxis dataKey="label" />
          <YAxis label={{ value: "min", position: "insideLeft", angle: -90 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
