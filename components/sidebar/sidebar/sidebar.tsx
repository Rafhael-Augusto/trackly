"use client";

import { useState } from "react";

import Link from "next/link";

import {
  CheckCheckIcon,
  ClipboardListIcon,
  ClockIcon,
  GoalIcon,
  LayoutDashboardIcon,
  SettingsIcon,
} from "lucide-react";

import { SidebarItem } from "@/components/sidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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
    label: "Metas",
    page: "/goals",
    icon: GoalIcon,
    id: 3,
  },
];

const otherButtons = [
  {
    label: "Timer",
    icon: ClockIcon,
    page: "/stopwatch",
    id: 2,
  },
  {
    label: "Config",
    icon: SettingsIcon,
    page: "/settings",
    id: 4,
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      className="overflow-hidden transition-all bg-primary h-full w-2"
    >
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <SheetContent
          side="left"
          onMouseLeave={() => setIsOpen(false)}
          className="bg-primary text-secondary border-0"
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-1 my-4">
              <CheckCheckIcon size={30} className="text-green-600" />
              <Link href={"/"} className="text-2xl text-secondary">
                Trackly
              </Link>
            </SheetTitle>
          </SheetHeader>

          <div className="text-start mx-4">
            <ul className="flex flex-col gap-2 items-start">
              {buttonsList.map((item) => (
                <li key={item.id} className="w-full">
                  <SidebarItem data={item} />
                </li>
              ))}
            </ul>

            <p className="mt-12 text-secondary/50">Outros</p>

            <ul className="flex flex-col gap-2 items-start">
              {otherButtons.map((item) => (
                <li key={item.id} className="w-full">
                  <SidebarItem data={item} />
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
