"use client";
import { useMemo, useState } from "react";

import { Task } from "@/app/generated/prisma/client";

import { createNewTask } from "./actions";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { iconsList, iconsMap, iconsName } from "@/lib/icons";
import { FormData, formSchema } from "./schema";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  editingData?: Task;
};

export function TaskForm({ isOpen, setIsOpen, editingData }: Props) {
  const router = useRouter();

  const [isEnabled, setIsEnabled] = useState(true);

  async function deleteTask() {
    await fetch("/api/task", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingData?.id }),
    });

    setIsOpen(false);
    router.refresh();
  }

  async function updateTask(data: FormData) {
    const res = await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingData?.id, ...data }),
    });

    setIsOpen(false);
    router.refresh();
  }

  const hasData = () => {
    const data: FormData = {
      title: editingData?.title ? editingData.title : "",
      description: editingData?.description ? editingData.description : "",
      priority: editingData?.priority ? editingData.priority : "LOW",
      icon: (editingData?.icon as keyof typeof iconsMap) ?? "prancheta",
      status: editingData?.status ? editingData.status : "PENDING",
    };

    return data;
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: hasData(),
  });

  const iconNameInput = watch("icon");

  async function onSubmit(data: FormData) {
    if (editingData) {
      await updateTask(data);
    } else {
      setIsEnabled(false);
      await createNewTask(data);

      setIsOpen(false);
      setIsEnabled(true);
    }
  }

  const onClose = () => {
    reset();

    setIsOpen(false);
  };

  const getIcons = useMemo(() => {
    const icons = !iconNameInput
      ? iconsList
      : iconsList.filter((icon) =>
          icon.name.includes(iconNameInput.toLowerCase()),
        );

    return icons;
  }, [iconNameInput]);

  const GetCurrentIcon = iconsMap[iconNameInput];

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()} modal={false}>
      <div
        className={cn(
          "backdrop-blur-xs bg-black/50 h-screen w-screen top-0 left-0 z-0",
          isOpen ? "fixed" : "hidden",
        )}
      />

      <DialogContent className="bg-primary border-0 text-secondary">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {editingData ? "Editar tarefa" : "Criar nova tarefa"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {editingData ? "Edite tarefa" : "Crie uma nova tarefa"}
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

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="task-priority">
                  Prioridade da tarefa
                </FieldLabel>

                <Controller
                  name="priority"
                  control={control}
                  defaultValue="LOW"
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="flex gap-2 items-center bg-secondary/5 rounded-xl border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="text-secondary bg-primary">
                        <SelectGroup>
                          <SelectItem value="HIGH">Alto</SelectItem>
                          <SelectItem value="LOW">Baixo</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />

                {errors.priority && (
                  <FieldError>{errors.priority.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="icon">Icone</FieldLabel>
                <Combobox items={getIcons.map((item) => item.name)}>
                  <div className="flex gap-2 items-center bg-secondary/5 px-2 rounded-xl">
                    <div className="flex items-center gap-2">
                      {GetCurrentIcon && <GetCurrentIcon />}
                    </div>

                    <ComboboxInput
                      {...register("icon")}
                      value={iconNameInput}
                      id="icon"
                      placeholder="Icone"
                      className="border-0 w-full"
                    />
                  </div>
                  {errors.icon && (
                    <FieldError>{errors.icon.message}</FieldError>
                  )}

                  <ComboboxContent className="bg-primary text-secondary">
                    <ComboboxEmpty>Icone nao encontrado</ComboboxEmpty>
                    <ComboboxList className="flex flex-wrap gap-4">
                      {getIcons.map((item) => (
                        <div
                          key={item.name}
                          onClick={() =>
                            setValue("icon", item.name as FormData["icon"])
                          }
                          className="w-full flex-1 flex justify-center"
                        >
                          <Tooltip>
                            <TooltipTrigger>
                              <ComboboxItem
                                key={item.name}
                                value={item.name}
                                className="p-3"
                              >
                                <item.component />
                              </ComboboxItem>
                            </TooltipTrigger>
                            <TooltipContent>{item.name}</TooltipContent>
                          </Tooltip>
                        </div>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </Field>
            </FieldGroup>

            <Field>
              <Button
                variant={"secondary"}
                type="submit"
                disabled={isEnabled ? false : true}
              >
                {editingData ? "Editar" : "Criar"}
              </Button>

              {editingData && (
                <Button
                  onClick={() => deleteTask()}
                  type="button"
                  variant={"destructive"}
                >
                  Deletar
                </Button>
              )}
            </Field>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}
