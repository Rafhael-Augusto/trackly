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

type Period = "weekly" | "monthly";

type PropsData = {
  totalSeconds: number;
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
  horas?: number;
};

export function TimeTrackerChart({ props }: Props) {
  const [period, setPeriod] = useState("weekly");

  const [data, setData] = useState<WeeklyData[] | MonthlyData[]>(
    props.dataWeekly,
  );

  const newChartData = (data: WeeklyData[] | MonthlyData[]): UpdatedData[] => {
    const newDataArray = data.map((item) => {
      const label = "day" in item ? item.day : item.month.slice(0, 3);

      return {
        label: label,
        horas: +(item.totalSeconds / 3600).toFixed(2),
      };
    });

    return newDataArray;
  };

  const handleDataChange = (value: Period) => {
    const dataMap = {
      monthly: props.dataMonthly,
      weekly: props.dataWeekly,
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
