"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { format } from "date-fns";

import { FormData, formSchema } from "./schema";

import { CalendarIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { createNewGoal } from "./actions";

type Props = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

export function GoalsForm({ isOpen, setIsOpen }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormData) {
    await createNewGoal(data);

    setIsOpen(false);
    reset();
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
            <DialogTitle>Criar nova meta</DialogTitle>
            <DialogDescription className="sr-only">
              Crie uma nova meta
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
                  <Popover>
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
                        onSelect={(date) => field.onChange(date)}
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
