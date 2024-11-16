"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import ActionColumn from "@/app/_utils/data-table/action-column";
import { A__DELETE__Document } from "./actions";
import TableAction from "./table-action";

export const __Schema__Document = z.object({
  id: z.string().optional(),
  documentType: z.enum(["NID", "PASSPORT", "BANK_STATEMENT", "UTILITY_BILL"]),
  images: z.array(z.instanceof(File).optional()),
  status: z.enum(["PENDING", "REJECT", "ACCEPT"]).optional(),
});

export type T__Schema__Document = z.infer<typeof __Schema__Document>;

export const __Columns__Document: ColumnDef<T__Schema__Document>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "documentType",
    header: "Document Type",
    cell: ({ row }) => row.original.documentType,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => row.original.status,
  },
  {
    id: "actions",
    cell: ({ row }) => <TableAction row={row} />,
  },
];
