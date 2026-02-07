"use client";

import { useState } from "react";

import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  CheckCheckIcon,
  ClipboardListIcon,
  ClockIcon,
  GoalIcon,
  LayoutDashboardIcon,
  SettingsIcon,
} from "lucide-react";

import SidebarButton from "../sidebarItem/sidebarItem";

const buttonsList = [
  {
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    page: "/",
    id: 0,
  },
  {
    label: "Tarefas",
    icon: ClipboardListIcon,
    page: "/tasks",
    id: 1,
  },
  {
    label: "Timer",
    icon: ClockIcon,
    page: "/stopwatch",
    id: 2,
  },
  {
    label: "Metas",
    page: "/goals",
    icon: GoalIcon,
    id: 3,
  },
];

const otherButtons = [
  {
    label: "Configuracoes",
    icon: SettingsIcon,
    page: "/settings",
    id: 4,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      onMouseEnter={() => toggleSidebar()}
      onMouseLeave={() => toggleSidebar()}
      className={cn(
        "bg-primary text-secondary overflow-hidden transition-all  h-full",
        isOpen ? "w-72" : "w-2",
      )}
    >
      <div className="text-start mx-4">
        <div className="flex items-center gap-1 my-4">
          <CheckCheckIcon size={30} className="text-green-600" />
          <Link href={"/"} className="text-2xl">
            Trackly
          </Link>
        </div>

        <ul className="flex flex-col gap-2 items-start">
          {buttonsList.map((item) => (
            <li key={item.id} className="w-full">
              <SidebarButton data={item} />
            </li>
          ))}
        </ul>

        <p className="mt-12 text-secondary/50">Outros</p>

        <ul className="flex flex-col gap-2 items-start">
          {otherButtons.map((item) => (
            <li key={item.id} className="w-full">
              <SidebarButton data={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
