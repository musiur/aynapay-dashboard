"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import ActionColumn from "@/app/_utils/data-table/action-column";
import { A__DELETE__Customer } from "./action";
import Image from "next/image";

export const __Schema__Customers = z.object({
  id: z.string().optional(),
  name: z.string(),
  profilePicture: z.instanceof(File).or(z.string()),
  contactNumber: z.string(),
  walletId: z.string(),
  referredBy: z.string(),
  ownReferralCode: z.string(),
  apiKey: z.string(),
  profitInfoId: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  profitInfo: z.object({
    id: z.string().optional(),
    profitPercent: z.number(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
  wallet: z.object({
    id: z.string().optional(),
    balance: z.number(),
    securityMoney: z.number(),
    holdAmount: z.number(),
    status: z.enum(["INACTIVE", "ACTIVE"]),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
});

export type T__Schema__Customers = z.infer<typeof __Schema__Customers>;

export const __Columns__Customers: ColumnDef<T__Schema__Customers>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: "profitInfo.profitPercent]",
    header: "Profit Percent (%)",
    cell: ({ row }) => row.original.profitInfo.profitPercent,
  },
  {
    accessorKey: "wallet.balance",
    header: "Balance",
    cell: ({ row }) => row.original.wallet.balance,
  },
  {
    accessorKey: "wallet.status",
    header: "Status",
    cell: ({ row }) => row.original.wallet.status,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionColumn
        basePath="/dashboard/promo-codes"
        id={row.original.id || "dummy__id"}
        action={A__DELETE__Customer}
        view={false}
      />
    ),
  },
];
