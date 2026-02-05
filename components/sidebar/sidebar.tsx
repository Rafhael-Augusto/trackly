"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  CheckCheckIcon,
  ClipboardListIcon,
  ClockIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import SidebarButton from "../sidebarItem/sidebarItem";
import Link from "next/link";

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
  const [isOpen, setIsOpen] = useState(false);

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
          <Link href={"/"} className="text-4xl my-8">
            TRACKLY
          </Link>
        </div>

        <h2 className="text-lg mb-2">Menu</h2>

        <ul className="flex flex-col gap-2 items-start">
          {buttonsList.map((item) => (
            <li key={item.id}>
              <SidebarButton data={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
