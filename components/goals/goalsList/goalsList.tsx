"use client";

import { useMemo, useState } from "react";

import { useDebounce } from "use-debounce";

import { Goal } from "@/app/generated/prisma/client";

import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { GoalsTable, GoalsForm } from "@/components/goals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  data: Goal[];
};

export function GoalsList({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [debounceQuery] = useDebounce(query, 500);

  const filteredTasks = useMemo(() => {
    if (debounceQuery) {
      const result = data.filter((item) =>
        item.title.toLowerCase().includes(debounceQuery.toLowerCase()),
      );

      return result;
    } else {
      return data;
    }
  }, [data, debounceQuery]);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={"flex items-center justify-start gap-8"}>
              Metas
              <Button onClick={() => setIsOpen(true)} variant={"secondary"}>
                Criar Meta
              </Button>
            </CardTitle>

            <InputGroup className="w-1/5 bg-secondary/5 border-0">
              <InputGroupInput
                type="search"
                placeholder="Pesquisar..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <InputGroupAddon align="inline-end">
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </CardHeader>

        <CardContent>
          <GoalsTable data={filteredTasks} />
        </CardContent>
      </Card>

      <GoalsForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
