import { Goals } from "@/types";

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
  data: Goals[];
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
            <TableCell>{item.deadline}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
