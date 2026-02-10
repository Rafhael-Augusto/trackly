"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import GoalsForm from "../goalsForm/goalsForm";

const head = [
  {
    label: "Meta",
  },
  {
    label: "Descricao",
  },
  {
    label: "Deadline",
  },
];

export default function GoalsList() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-xl">
            Metas{" "}
            <Button onClick={() => setIsOpen(true)} variant={"secondary"}>
              Criar Meta
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {head.map((item) => (
                  <TableHead
                    key={item.label}
                    className="text-secondary font-bold"
                  >
                    {item.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow className="hover:bg-secondary/5">
                <TableCell className="font-bold">Comprar um carro</TableCell>
                <TableCell>
                  Comprar um carro pra ir pra bahia sei la kkkk
                </TableCell>
                <TableCell>21/01/2070</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <GoalsForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
