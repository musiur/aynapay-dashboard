"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import ActionColumn from "@/app/_utils/data-table/action-column";
import WithdrawConfirmer from "./withdraw-confirmer";
import { format } from "date-fns";

export const __Schema__WithdrawRequests = z.object({
  id: z.string(),
  userId: z.string(),
  userPaymentMethodId: z.string(),
  amount: z.number(),
  status: z.string(),
  paymentTransactionId: z.string(),
  actionBy: z.null(),
  note: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type T__Schema__WithdrawRequests = z.infer<
  typeof __Schema__WithdrawRequests
>;

export const __Columns__WithdrawRequests: ColumnDef<T__Schema__WithdrawRequests>[] =
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
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => row.original.id,
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
      accessorKey: "updatedAt",
      header: "Last Update",
      cell: ({ row }) => {
        const date = new Date(row.original.updatedAt);

        return (
          <div>
            {format(date, "h:mm a dd MMMM yyyy")}
          </div>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);

        return (
          <div>
            {format(date, "h:mm a dd MMMM yyyy")}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-start gap-1">
          <ActionColumn
            basePath="/dashboard/withdraw-requests"
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
          {row.original.status === "Pending" ? (
            <WithdrawConfirmer id={row.original.id} />
          ) : null}
        </div>
      ),
    },
  ];
