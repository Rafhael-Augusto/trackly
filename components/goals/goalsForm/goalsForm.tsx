"use client";

import { useEffect, useState } from "react";

import { Goal } from "@/app/generated/prisma/client";

import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";

import { format } from "date-fns";

import { FormData, formSchema } from "./schema";
import { createNewGoal } from "./actions";

import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
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
  editingData?: Goal;
};

export function GoalsForm({ isOpen, setIsOpen, editingData }: Props) {
  const router = useRouter();

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  async function deleteGoal() {
    await fetch("/api/goal", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingData?.id }),
    });

    setIsOpen(false);
    router.refresh();
  }

  async function updateGoal(data: FormData) {
    await fetch("/api/goal", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingData?.id, ...data }),
    });

    setIsOpen(false);
    router.refresh();
  }

  const hasData = () => {
    const data = {
      title: editingData?.title ? editingData.title : "",
      description: editingData?.description ? editingData.description : "",
      deadline: editingData?.deadline
        ? new Date(editingData.deadline)
        : undefined,
    };

    return data;
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: hasData(),
  });

  async function onSubmit(data: FormData) {
    if (editingData) {
      await updateGoal(data);
    } else {
      setIsEnabled(false);
      await createNewGoal(data);

      setIsOpen(false);
      reset();
      setIsEnabled(true);
    }
  }

  const handleDaySelect = (date: Date | undefined) => {
    if (date) {
      setValue("deadline", date);
      setCalendarOpen(false);
    }
  };

  useEffect(() => {
    if (editingData) {
      reset({
        title: editingData.title,
        description: editingData.description,
        deadline: new Date(editingData.deadline),
      });
    }
  }, [editingData, reset]);

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
            <DialogTitle>
              {editingData ? "Editar meta" : "Criar nova meta"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {editingData ? "Edite meta" : "Crie uma nova meta"}
            </DialogDescription>
          </DialogHeader>
          <FieldSet>
            <FieldGroup className="flex-row ">
              <Field>
                <FieldLabel htmlFor="goal-name">Nome da meta</FieldLabel>
                <Input
                  {...register("title")}
                  id="task-name"
                  autoComplete="off"
                  placeholder="Meta"
                  className="bg-secondary/5 p-2 rounded-xl border-0"
                />
                {errors.title && (
                  <FieldError>{errors.title.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="goal-description">
                  Descricao da meta
                </FieldLabel>
                <Input
                  {...register("description")}
                  id="goal-description"
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
              <FieldLabel htmlFor="deadline">Selecione o deadline</FieldLabel>

              <Controller
                name="deadline"
                control={control}
                render={({ field }) => (
                  <Popover
                    open={calendarOpen}
                    onOpenChange={(value) => setCalendarOpen(value)}
                  >
                    <PopoverTrigger asChild>
                      <Button className="bg-secondary/5">
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Seleciona uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="bg-primary text-secondary">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => handleDaySelect(date)}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />

              {errors.deadline && (
                <FieldError>{errors.deadline.message}</FieldError>
              )}
            </Field>

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
                  onClick={() => deleteGoal()}
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
