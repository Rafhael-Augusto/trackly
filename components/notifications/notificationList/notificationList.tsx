"use client";

import { useMemo, useState } from "react";

import { useDebounce } from "use-debounce";

import { Notification } from "@/app/generated/prisma/client";

import { SearchIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { SwitchField } from "@/components/misc";
import {
  NotificationForm,
  NotificationItemList,
} from "@/components/notifications";

type Props = {
  data: Notification[];
};

export function NotificationList({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSwitched, setIsSwitched] = useState(false);

  const [query, setQuery] = useState("");
  const [debounceQuery] = useDebounce(query, 500);

  const filteredData = useMemo(() => {
    if (debounceQuery) {
      return data.filter((item) =>
        item.title.toLowerCase().includes(debounceQuery.toLowerCase()),
      );
    } else {
      return data;
    }
  }, [data, debounceQuery]);

  const fieldData = {
    title: "Ativar notificacoes",
    description: "Clique para comecar a receber notificacoes pelo navegador",
    isOpen: isSwitched,
    setIsOpen: setIsSwitched,
  };

  return (
    <div>
      <div className="mb-4">
        <SwitchField data={fieldData} />
      </div>

      <Card className="px-5">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-8">
            <p>Notificacoes</p>
            <Button onClick={() => setIsOpen(true)} variant={"secondary"}>
              Criar Notificacao
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
        </CardHeader>

        <CardContent className="bg-secondary p-0 rounded-2xl">
          <NotificationItemList data={filteredData} />
        </CardContent>
      </Card>

      <NotificationForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
