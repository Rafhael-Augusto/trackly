"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  CheckCheckIcon,
  ClipboardListIcon,
  ClockIcon,
  LayoutDashboardIcon,
} from "lucide-react";

const buttonsList = [
  {
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    id: 0,
  },
  {
    label: "Tarefas",
    icon: ClipboardListIcon,
    id: 1,
  },
  {
    label: "Timer",
    icon: ClockIcon,
    id: 2,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      onMouseEnter={() => toggleSidebar()}
      onMouseLeave={() => toggleSidebar()}
      className={cn(
        "bg-primary text-secondary overflow-hidden transition-all h-full",
        isOpen ? "w-72" : "w-2",
      )}
    >
      <div className="text-start py-4 mx-4">
        <div className="flex items-center gap-4">
          <CheckCheckIcon size={40} className="text-green-600" />
          <h1 className=" text-4xl my-8">TRACKLY</h1>
        </div>

        <h2 className="text-lg mb-2">Menu</h2>

        <ul className="flex flex-col gap-2 items-start">
          {buttonsList.map((item) => (
            <li key={item.id} className="flex items-center gap-2">
              <item.icon />
              <Button className="text-xl font-bold p-0!">{item.label}</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
