import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  data: {
    label: string;
    icon: LucideIcon;
  };
};

export default function SidebarItem({ data }: Props) {
  return (
    <Link
      href={"#"}
      className="flex items-center gap-2 h-full hover:bg-secondary hover:text-primary p-1 rounded-md"
    >
      <data.icon />
      <p className="text-lg p-0!">{data.label}</p>
    </Link>
  );
}
