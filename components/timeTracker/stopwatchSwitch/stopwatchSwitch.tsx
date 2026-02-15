"use client";

import { Switch } from "@/components/ui/switch";
import { useTimeTrackerContext } from "@/components/timeTracker";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";

export function StopwatchSwitch() {
  const { isOpen, setIsOpen } = useTimeTrackerContext();

  return (
    <FieldSet className="w-full max-w-sm bg-secondary/5 rounded-xl">
      <FieldLabel className="border-0!" htmlFor="switch">
        <Field className=" flex-row items-center">
          <FieldContent>
            <FieldTitle>Timer persistente</FieldTitle>
            <FieldDescription>
              Quando ativado, voce consegue um timer persistente entre paginas
            </FieldDescription>
          </FieldContent>
          <Switch
            checked={isOpen}
            onCheckedChange={(value) => setIsOpen(value)}
            id="switch"
          />
        </Field>
      </FieldLabel>
    </FieldSet>
  );
}
