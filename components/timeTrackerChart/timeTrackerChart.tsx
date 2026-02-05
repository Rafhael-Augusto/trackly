"use client";

import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { TimeTrackerTooltip } from "../customTooltip/timeTrackerTooltip";

const data = [
  { day: "Segunda", hours: 1, minutes: 31, seconds: 2 },
  { day: "Terca", hours: 2, minutes: 15, seconds: 30 },
  { day: "Quarta", hours: 0, minutes: 45, seconds: 0 },
  { day: "Quinta", hours: 0, minutes: 15, seconds: 0 },
  { day: "Sexta", hours: 1, minutes: 45, seconds: 0 },
  { day: "Sabado", hours: 0, minutes: 25, seconds: 40 },
  { day: "Domingo", hours: 0, minutes: 55, seconds: 38 },
];

export default function TimeTrackerChart() {
  const charData = data.map((item) => ({
    day: item.day.slice(0, 3),
    totalMinutes: Math.floor(
      item.hours * 60 + item.minutes + item.seconds / 60,
    ),
  }));

  return (
    <div className="bg-primary rounded-xl pr-4 pt-4 h-1/2">
      <LineChart responsive data={charData} className="w-full h-full">
        <Line type="monotone" dataKey="totalMinutes" />
        <Tooltip content={TimeTrackerTooltip} />
        <XAxis dataKey="day" />
        <YAxis label={{ value: "min", position: "insideLeft", angle: -90 }} />
      </LineChart>
    </div>
  );
}
