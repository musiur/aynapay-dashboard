"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import ActionColumn from "@/app/_utils/data-table/action-column";
import { A__DELETE__PaymentMethod } from "./actions";
import Image from "next/image";

export const __Schema__PaymentMethods = z.object({
  id: z.string().optional(),
  providerName: z.string(),
  providerType: z.enum(["MFS", "BANK", "CARD", "CRYPTO", "OTHERS"]),
  codeName: z.string(),
  icon: z
    .instanceof(File)
    .optional()
    .refine((file) => file && file.size <= 3 * 1024 * 1024, {
      message: "Each file should not exceed 3MB",
    }),
  receivingChanelNumberOrName: z.string(),
  exchangeRate: z.number(),
});

export type T__Schema__PaymentMethods = z.infer<
  typeof __Schema__PaymentMethods
>;

export const __Columns__PaymentMethods: ColumnDef<T__Schema__PaymentMethods>[] =
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
      accessorKey: "providerName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Provider Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => row.original.providerName,
    },
    {
      accessorKey: "icon",
      header: "Icon",
      cell: ({ row }) => {
        return row.original.icon ? (
          <Image
            // @ts-ignore
            src={row.original.icon}
            alt={row.original.providerName}
            width={40}
            height={40}
            className="w-8 h-8 rounded-md"
          />
        ) : null;
      },
    },
    {
      accessorKey: "codeName",
      header: "Code Name",
      cell: ({ row }) => row.original.codeName,
    },
    {
      accessorKey: "providerType",
      header: "Provider Type",
      cell: ({ row }) => row.original.providerType,
    },
    {
      accessorKey: "exchangeRate",
      header: "Exchange Rate (BDT)",
      cell: ({ row }) => row.original.exchangeRate,
    },
    {
      accessorKey: "receivingChanelNumberOrName",
      header: "Channel/Name",
      cell: ({ row }) => row.original.receivingChanelNumberOrName,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ActionColumn
          basePath="/dashboard/payment-methods"
          id={row.original.id || "dummy__id"}
          action={A__DELETE__PaymentMethod}
          view={false}
        />
      ),
    },
  ];
