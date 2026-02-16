import { Goal } from "@/app/generated/prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const head = [
  {
    label: "Meta",
  },
  {
    label: "Descricao",
  },
  {
    label: "Deadline",
  },
];

type Props = {
  data: Goal[];
};

export function GoalsTable({ data }: Props) {
  console.log("data: ", data);

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          {head.map((item) => (
            <TableHead key={item.label} className="text-secondary font-bold">
              {item.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id} className="hover:bg-secondary/5">
            <TableCell className="font-bold">{item.title}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>Data aqui</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
