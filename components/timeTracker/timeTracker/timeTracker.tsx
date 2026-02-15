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
  const { isOpen } = useTimeTrackerContext();

  return (
    <div>
      {isOpen && (
        <Card className={cn(draggable && "border-2")}>
          <CardHeader
            className={cn(draggable && "flex items-center justify-between")}
          >
            <CardTitle>Time Tracker</CardTitle>

            {draggable && (
              <Button className="p-0!">
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
