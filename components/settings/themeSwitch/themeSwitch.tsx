"use client";

import { useTheme } from "next-themes";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <FieldSet className="w-full max-w-sm bg-secondary/5 rounded-xl">
      <FieldLabel className="border-0!" htmlFor="switch">
        <Field className="flex-row items-center">
          <FieldContent>
            <FieldTitle>Mudar tema</FieldTitle>
            <FieldDescription>
              Mudar o tema do site para tema escuro ou tema claro
            </FieldDescription>
          </FieldContent>

          <Switch
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            id="switch"
          />
        </Field>
      </FieldLabel>
    </FieldSet>
  );
}
