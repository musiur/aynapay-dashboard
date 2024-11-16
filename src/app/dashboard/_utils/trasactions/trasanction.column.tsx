"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import ActionColumn from "@/app/_utils/data-table/action-column";
import clsx from "clsx";
import TransactionConfirmer from "./transaction-confirmer";
import { objectIdShortner } from "@/lib/utils";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export const __Schema__Transactions = z.object({
  id: z.string(),
  trnxId: z.string().optional(),
  transactionId: z.string(),
  method: z.string(),
  amount: z.number(),
  status: z.string(),
  type: z.string(),
  createdAt: z.string(),
  transactionType: z.string(),
  description: z.string(),
  senderId: z.string(),
  userId: z.string(),
  receiverId: z.string(),
  providerType: z.string(),
});

export type T__Schema__Transactions = z.infer<typeof __Schema__Transactions>;

export const __Columns__Transactions: ColumnDef<T__Schema__Transactions>[] = [
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
    header: "Transaction ID",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.transactionId
            ? objectIdShortner(row.original.transactionId)
            : "-"}
        </div>
      );
    },
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
    cell: ({ row }) => {
      return (
        <div
          className={clsx({
            "text-red-600": row.original.type === "DEBIT",
            "text-green-600": row.original.type === "CREDIT",
          })}
        >
          BDT {row.original.amount}
        </div>
      );
    },
  },

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <div className="min-w-[200px]">{row.original.description}</div>;
    },
  },

  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="min-w-[120px]">
        {row.original?.type || ""}
        {row.original?.type && row.original?.transactionType ? "-" : ""}
        {row.original?.transactionType || ""}
      </div>
    ),
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => row.original.method,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) =>
      row.original.status === "InProgress"
        ? "In Progress"
        : row.original.status,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start gap-1">
          {
            row.original?.transactionType ? <Link href={`/dashboard/transactions/view?id=${row.original.transactionId}&type=${row.original.transactionType}`}>
              <Button variant="outline" size="icon">
                <Eye className="w-4 h-4" />
              </Button>
            </Link> : null
          }

          <Suspense fallback={<Skeleton className="w-10 h-10" />}>
            <ActionColumn
              basePath="/dashboard/transactions?tab=transactions"
              id={row.original.id || "dummy__id"}
              update={row.original.status === "Pending"}
              view={false}
              remove={false}
            />
          </Suspense>

          {row.original.status === "Completed" ? (
            <Button variant="outline" disabled>
              Accepted
            </Button>
          ) : null}

          {row.original.receiverId === row.original.userId &&
            row.original.status === "InProgress" ? (
            <TransactionConfirmer
              id={row.original.transactionId}
              type={row.original.type}
              transactionType={row.original.transactionType}
              providerType={row.original.providerType}
            />
          ) : null}
        </div>
      );
    },
  },
];
