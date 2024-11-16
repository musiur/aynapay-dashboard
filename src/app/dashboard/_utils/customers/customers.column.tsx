"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import ActionColumn from "@/app/_utils/data-table/action-column";
import { A__DELETE__Customer } from "./action";

export const __Schema__Customers = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  profilePicture: z.instanceof(File).or(z.string()),
  contactNumber: z.string(),
  walletId: z.string(),
  referredBy: z.string(),
  ownReferralCode: z.string(),
  apiKey: z.string(),
  profitInfoId: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  wallet: z.object({
    id: z.string().optional(),
    secretKey: z.string().optional(),
    isSecretKeyActive: z.boolean().optional(),
    balance: z.number().optional(),
    holdAmount: z.number().optional(),
    securityMoney: z.number().optional(),
    withdrawalPendingAmount: z.number().optional(),
    refundPendingAmount: z.number().optional(),
    isAllowedForCryptoTransaction: z.boolean().optional(),
    earningAvailableBalance: z.number().optional(),
    lifetimeEarnedBalance: z.number().optional(),
    status: z.enum(["INACTIVE", "ACTIVE"]),
  }),
  developmentInfo: z.object({
    apiKey: z.string(),
    gatewayFeesInPercentForPlatform: z.number().optional(),
    refundProcessFeesInPercentForPlatform: z.number().optional(),
    commissionRateInPercentForPaymentProcessor: z.number().optional(),
    commissionRateInPercentForRefundProcessor: z.number().optional(),
  }),
  auth: z.object({
    status: z.string().optional(),
    role: z.string().optional(),
    email: z.string().optional(),
    name: z.string().optional(),
  }),
  status: z.string().optional(),
  email: z.string().optional(),
  balance: z.number().optional(),
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
    cell: ({ row }) => row.original?.name,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.original?.email,
  },
  {
    accessorKey: "wallet.balance",
    header: "Balance",
    cell: ({ row }) => row.original.balance,
  },
  {
    accessorKey: "wallet.status",
    header: "Status",
    cell: ({ row }) => row.original.status,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionColumn
        basePath="/dashboard/customers"
        id={row.original.id || "dummy__id"}
        action={A__DELETE__Customer}
        view={false}
      />
    ),
  },
];
