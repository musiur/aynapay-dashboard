"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import ActionColumn from "@/app/_utils/data-table/action-column";
import DepositConfirmer from "./deposit-confirmer";

export const __Schema__DepositRequests = z.object({
  id: z.string(),
  amount: z.number(),
  transactionId: z.string(),
  method: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type T__Schema__DepositRequests = z.infer<
  typeof __Schema__DepositRequests
>;

export const __Columns__DepositRequests: ColumnDef<T__Schema__DepositRequests>[] =
  [
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
      accessorKey: "transactionId",
      header: "Transaction Id",
      cell: ({ row }) => row.original.id,
    },
    {
      accessorKey: "method",
      header: "Method",
      cell: ({ row }) => row.original.method,
    },

    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => row.original.amount,
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => row.original.status,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-start gap-1">
          <ActionColumn
            basePath="/dashboard/deposit-requests"
            id={row.original.id || "dummy__id"}
            update={!["Completed", "Accepted"].includes(row.original.status)}
            view={false}
            remove={false}
          />
          {row.original.status === "Completed" ? (
            <Button variant="outline" disabled>
              Accepted
            </Button>
          ) : null}
          {row.original.status === "InProgress" ? (
            <DepositConfirmer id={row.original.id} />
          ) : null}
        </div>
      ),
    },
  ];
