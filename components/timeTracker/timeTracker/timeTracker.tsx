"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StopWatch, useTimeTrackerContext } from "@/components/timeTracker";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  draggable?: boolean;
};

export function TimeTracker({ draggable }: Props) {
  const { isOpen, setIsOpen } = useTimeTrackerContext();

  return (
    <div className="w-full">
      {isOpen && (
        <Card className={cn(draggable && "border-2 w-full")}>
          <CardHeader
            className={cn(
              draggable && "flex items-center justify-between h-6 ",
            )}
          >
            <CardTitle>Time Tracker</CardTitle>

            {draggable && (
              <Button
                className="p-0! bg-transparent"
                onClick={() => setIsOpen(false)}
              >
                <XIcon className="size-6" />
              </Button>
            )}
          </CardHeader>

          <CardContent>
            <StopWatch />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
