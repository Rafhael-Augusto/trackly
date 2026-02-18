"use client";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { findIcon, iconsList, iconsName } from "@/utils/icons";
import { FormData, formSchema } from "./schema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { createNewTask } from "./actions";

type Props = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

export function TaskForm({ isOpen, setIsOpen }: Props) {
  const [currentIcon, setCurrentIcon] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const iconInput = watch("icon") || "";

  const GetIcon = findIcon(currentIcon);

  async function onSubmit(data: FormData) {
    await createNewTask(data);

    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)} modal={false}>
      <div
        className={cn(
          "backdrop-blur-xs bg-black/50 h-screen w-screen top-0 left-0 z-0",
          isOpen ? "fixed" : "hidden",
        )}
      />

      <DialogContent className="bg-primary border-0 text-secondary">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Criar nova tarefa</DialogTitle>
            <DialogDescription className="sr-only">
              Crie uma nova tarefa
            </DialogDescription>
          </DialogHeader>
          <FieldSet>
            <FieldGroup className="flex-row ">
              <Field>
                <FieldLabel htmlFor="task-name">Nome da tarefa</FieldLabel>
                <Input
                  {...register("title")}
                  id="task-name"
                  autoComplete="off"
                  placeholder="Tarefa"
                  className="bg-secondary/5 p-2 rounded-xl border-0"
                />
                {errors.title && (
                  <FieldError>{errors.title.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="task-description">
                  Descricao da tarefa
                </FieldLabel>
                <Input
                  {...register("description")}
                  id="task-description"
                  autoComplete="off"
                  placeholder="Descricao"
                  className="bg-secondary/5 p-2 rounded-xl border-0"
                />
                {errors.description && (
                  <FieldError>{errors.description.message}</FieldError>
                )}
              </Field>
            </FieldGroup>

            <Field>
              <FieldLabel htmlFor="icon">Icone</FieldLabel>
              <Combobox items={iconsName}>
                <div className="flex gap-2 items-center bg-secondary/5 p-2 rounded-xl">
                  <div className="flex items-center gap-2">
                    {GetIcon && <GetIcon />}
                  </div>

                  <ComboboxInput
                    {...register("icon")}
                    id="icon"
                    placeholder="Icone"
                    className="border-0 w-full"
                  />
                </div>
                {errors.icon && <FieldError>{errors.icon.message}</FieldError>}

                <ComboboxContent className="bg-primary text-secondary">
                  <ComboboxEmpty>Icone nao encontrado</ComboboxEmpty>
                  <ComboboxList className="flex flex-wrap gap-4">
                    {iconsList.map((item) => {
                      const Icon = item.component;

                      if (item.name.includes(iconInput.toLowerCase()))
                        return (
                          <div
                            key={item.name}
                            onClick={() => setCurrentIcon(item.name)}
                            className="w-full flex-1 flex justify-center"
                          >
                            <Tooltip>
                              <TooltipTrigger>
                                <ComboboxItem
                                  key={item.name}
                                  value={item.name}
                                  className="p-3 "
                                >
                                  <Icon />
                                </ComboboxItem>
                              </TooltipTrigger>
                              <TooltipContent>{item.name}</TooltipContent>
                            </Tooltip>
                          </div>
                        );
                    })}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>

            <Field>
              <Button variant={"secondary"} type="submit">
                Criar
              </Button>
            </Field>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}
