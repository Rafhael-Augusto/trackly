import { Switch } from "@/components/ui/switch";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";

type Props = {
  data: {
    title: string;
    description: string;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
  };
};

export function SwitchField({ data }: Props) {
  return (
    <FieldSet className="w-full max-w-sm bg-secondary/5 rounded-xl">
      <FieldLabel className="border-0!" htmlFor="switch">
        <Field className=" flex-row items-center">
          <FieldContent>
            <FieldTitle>{data.title}</FieldTitle>
            <FieldDescription>{data.description}</FieldDescription>
          </FieldContent>
          <Switch
            checked={data.isOpen}
            onCheckedChange={data.setIsOpen}
            id="switch"
          />
        </Field>
      </FieldLabel>
    </FieldSet>
  );
}
