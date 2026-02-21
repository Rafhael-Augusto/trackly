"use client";

import { useMemo, useState } from "react";

import { Goal } from "@/app/generated/prisma/client";

import { format } from "date-fns";

import { ChevronDownIcon, ChevronUpIcon, GoalIcon } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { GoalsForm } from "../goalsForm/goalsForm";

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

type Props = {
  data: Goal[];
};

type Filter = "higher" | "lower";

export function GoalsTable({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("higher");

  const [editData, setEditData] = useState<Goal>();

  const filterData = useMemo(() => {
    if (filter === "higher") {
      return data.sort((a, b) => b.deadline.getTime() - a.deadline.getTime());
    } else {
      return data.sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
    }
  }, [filter, data]);

  const handleFilterClick = () => {
    if (filter === "higher") {
      setFilter("lower");
    } else {
      setFilter("higher");
    }
  };

  const handleClick = (data: Goal) => {
    setEditData(data);

    setIsOpen(true);
  };

  return (
    <div>
      <div>
        {data.length < 1 && (
          <Empty className="border border-dashed m-4">
            <EmptyHeader>
              <EmptyMedia>
                <GoalIcon />
              </EmptyMedia>
              <EmptyTitle>Nenhuma meta</EmptyTitle>
              <EmptyDescription>
                Crie uma nova meta clicando no botao &apos;Criar Meta&apos;
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
        {data.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent ">
                {head.map((item) => (
                  <TableHead
                    key={item.label}
                    className="text-secondary font-bold"
                  >
                    <div className="flex items-center gap-2">
                      {item.label}
                      {item.label === "Deadline" && (
                        <Button
                          onClick={() => handleFilterClick()}
                          className="bg-transparent"
                        >
                          <div className="flex items-center justify-center h-8 w-8">
                            {filter === "higher" ? (
                              <ChevronUpIcon className="size-5" />
                            ) : (
                              <ChevronDownIcon className="size-5" />
                            )}
                          </div>
                        </Button>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {filterData.map((item) => {
                const dateFormatted = format(item.deadline, "dd-MM-yyyy");

                return (
                  <TableRow
                    onClick={() => handleClick(item)}
                    key={item.id}
                    className="hover:bg-secondary/5"
                  >
                    <TableCell className="font-bold">{item.title}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{dateFormatted}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
      <GoalsForm isOpen={isOpen} setIsOpen={setIsOpen} editingData={editData} />
    </div>
  );
}
