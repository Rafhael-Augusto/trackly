"use client";

import { useState } from "react";

import { Goals } from "@/types";

import { Button } from "@/components/ui/button";

import { GoalsTable, GoalsForm } from "@/components/goals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  data: Goals[];
};

export function GoalsList({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-xl">
            Metas
            <Button onClick={() => setIsOpen(true)} variant={"secondary"}>
              Criar Meta
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <GoalsTable data={data} />
        </CardContent>
      </Card>

      <GoalsForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
