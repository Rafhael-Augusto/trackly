import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  data: {
    label: string;
    page: string;
    icon: LucideIcon;
  };
};

export default function SidebarItem({ data }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={data.page}
      className={cn(
        "flex items-center gap-2 h-full  p-1 rounded-md",
        data.page === pathname
          ? "bg-secondary text-primary"
          : "hover:bg-secondary/5 hover:text-secondary",
      )}
    >
      <data.icon size={20} />
      <p className="text-lg p-0!">{data.label}</p>
    </Link>
  );
}
