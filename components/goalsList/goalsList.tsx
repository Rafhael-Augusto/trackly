"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import GoalsForm from "../goalsForm/goalsForm";
import GoalsTable from "../goalsTable/goalsTable";

export default function GoalsList() {
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
          <GoalsTable />
        </CardContent>
      </Card>

      <GoalsForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
