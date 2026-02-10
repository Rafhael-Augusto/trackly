"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { format } from "date-fns";

import { FormData, formSchema } from "./schema";

import { CalendarIcon } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";

type Props = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

export default function GoalsForm({ isOpen, setIsOpen }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)} modal={false}>
      <div
        className={cn(
          "backdrop-blur-xs bg-black/50 h-screen w-screen top-0 left-0 z-0",
          isOpen ? "fixed" : "hidden",
        )}
      />
      <SheetContent className="bg-primary border-0 z-10">
        <SheetHeader>
          <SheetTitle className="text-secondary">Criar nova meta</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-primary p-4 rounded-xl"
        >
          <FieldSet>
            <FieldGroup className="flex-row ">
              <Field>
                <FieldLabel htmlFor="goal-name">Nome da meta</FieldLabel>
                <Input
                  {...register("goalName")}
                  id="task-name"
                  autoComplete="off"
                  placeholder="Meta"
                  className="bg-secondary/5 p-2 rounded-xl border-0"
                />
                {errors.goalName && (
                  <FieldError>{errors.goalName.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="goal-description">
                  Descricao da meta
                </FieldLabel>
                <Input
                  {...register("goalDescription")}
                  id="goal-description"
                  autoComplete="off"
                  placeholder="Descricao"
                  className="bg-secondary/5 p-2 rounded-xl border-0"
                />
                {errors.goalDescription && (
                  <FieldError>{errors.goalDescription.message}</FieldError>
                )}
              </Field>
            </FieldGroup>

            <Field>
              <FieldLabel htmlFor="deadline">Selecione o deadline</FieldLabel>

              <Controller
                name="date"
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

              {errors.date && <FieldError>{errors.date.message}</FieldError>}
            </Field>

            <Field>
              <Button variant={"secondary"} type="submit">
                Criar
              </Button>
            </Field>
          </FieldSet>
        </form>
      </SheetContent>
    </Sheet>
  );
}
