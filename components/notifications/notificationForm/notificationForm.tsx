"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Notification } from "@/app/generated/prisma/client";

import { useMask } from "@react-input/mask";

import { createNewNotification } from "./actions";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { FormData, formSchema } from "./schema";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
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
  editingData?: Notification;
};

export function NotificationForm({ isOpen, setIsOpen, editingData }: Props) {
  const router = useRouter();

  const [isEnabled, setIsEnabled] = useState(true);

  async function deleteNotification() {
    await fetch("/api/notification", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingData?.id }),
    });

    setIsOpen(false);
    router.refresh();
  }

  async function updateNotification(data: FormData) {
    await fetch("/api/notification", {
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
      time: editingData?.time ? editingData.time : "",
      active: editingData?.active && editingData.active,
    };

    return data;
  };

  const inputRef = useMask({
    mask: "##:##",
    replacement: { "#": /\d/ },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: hasData(),
  });

  const { ref: registerRef, ...rest } = register("time");

  async function onSubmit(data: FormData) {
    if (editingData) {
      await updateNotification(data);
    } else {
      setIsEnabled(false);
      await createNewNotification(data);

      setIsOpen(false);
      reset();
      setIsEnabled(true);
    }
  }

  const onClose = () => {
    reset();

    setIsOpen(false);
  };

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
              {editingData
                ? "Editar notificacao"
                : "Criar uma nova notificacao"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {editingData
                ? "Editar notificacao"
                : "Criar uma nova notificacao"}
            </DialogDescription>
          </DialogHeader>
          <FieldSet>
            <FieldGroup className="flex-row">
              <Field>
                <FieldLabel htmlFor="notification-name">
                  Nome da notificacao
                </FieldLabel>
                <Input
                  {...register("title")}
                  id="notification-name"
                  autoComplete="off"
                  placeholder="Notificacao"
                  className="bg-secondary/5 p-2 rounded-xl border-0"
                />
                {errors.title && (
                  <FieldError>{errors.title.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="notification-description">
                  Descricao da notificacao
                </FieldLabel>
                <Input
                  {...register("description")}
                  id="notification-description"
                  autoComplete="off"
                  placeholder="Descricao"
                  className="bg-secondary/5 p-2 rounded-xl border-0"
                />
                {errors.description && (
                  <FieldError>{errors.description.message}</FieldError>
                )}
              </Field>
            </FieldGroup>

            <FieldGroup className="flex-row">
              <Field>
                <FieldLabel htmlFor="notification-time">
                  Selecionar horario
                </FieldLabel>

                <Input
                  {...rest}
                  ref={(node) => {
                    registerRef(node);
                    if (node) {
                      inputRef.current = node;
                    }
                  }}
                  id="notification-time"
                  autoComplete="off"
                  placeholder="Horario"
                  className="bg-secondary/5 p-2 rounded-xl border-0"
                />
                {errors.time && <FieldError>{errors.time.message}</FieldError>}
              </Field>

              <Field>
                <FieldLabel htmlFor="notification-active">Ativo</FieldLabel>

                <Controller
                  name="active"
                  control={control}
                  defaultValue={true}
                  render={({ field }) => (
                    <div
                      {...field}
                      className="flex items-center p-2 rounded-xl w-12! bg-secondary/5"
                    >
                      <Switch
                        id="notification-active"
                        checked={field.value}
                        onCheckedChange={(value) => field.onChange(value)}
                      />
                    </div>
                  )}
                />

                {errors.active && (
                  <FieldError>{errors.active.message}</FieldError>
                )}
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
                  onClick={() => deleteNotification()}
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
