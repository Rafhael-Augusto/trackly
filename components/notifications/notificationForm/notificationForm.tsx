"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

type Props = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

export function NotificationForm({ isOpen, setIsOpen }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: FormData) {
    console.log(data);
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
            <DialogTitle>Criar nova notificacao</DialogTitle>
            <DialogDescription className="sr-only">
              Crie uma nova notificacao
            </DialogDescription>
          </DialogHeader>
          <FieldSet>
            <FieldGroup className="flex-row ">
              <Field>
                <FieldLabel htmlFor="notification-name">
                  Nome da notificacao
                </FieldLabel>
                <Input
                  {...register("notificationName")}
                  id="notification-name"
                  autoComplete="off"
                  placeholder="Notificacao"
                  className="bg-secondary/5 p-2 rounded-xl border-0"
                />
                {errors.notificationName && (
                  <FieldError>{errors.notificationName.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="notification-description">
                  Descricao da notificacao
                </FieldLabel>
                <Input
                  {...register("notificationDesc")}
                  id="notification-description"
                  autoComplete="off"
                  placeholder="Descricao"
                  className="bg-secondary/5 p-2 rounded-xl border-0"
                />
                {errors.notificationDesc && (
                  <FieldError>{errors.notificationDesc.message}</FieldError>
                )}
              </Field>
            </FieldGroup>

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
