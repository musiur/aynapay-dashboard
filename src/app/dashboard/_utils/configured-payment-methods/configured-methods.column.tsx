"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import ActionColumn from "@/app/_utils/data-table/action-column";
import { A__DELETE__ConfiguredPaymentMethods } from "./actions";
import Image from "next/image";

export const __Schema__ConfiguredPaymentMethods = z.object({
  id: z.string().optional(),
  provider: z.string(),
  type: z.string(),
  icon: z.string(),
  status: z.string(),
  number: z.string(),
});

export type T__Schema__ConfiguredPaymentMethods = z.infer<
  typeof __Schema__ConfiguredPaymentMethods
>;

export const __Columns__ConfiguredPaymentMethods: ColumnDef<T__Schema__ConfiguredPaymentMethods>[] =
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
      accessorKey: "provider",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Provider
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const { provider, icon, number } = row.original;
        return (
          <div className="flex items-center gap-4">
            <Image
              src={icon}
              alt="method-icon"
              width={200}
              height={200}
              className="w-8 h-8 rounded-md"
            />
            <div>
              <p className="font-medium">{provider}</p>
              <p className="text-xs">
                {number.toString().slice(0, 15)}
                {number.toString().length > 15 ? "..." : ""}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        return (
          <div className="text-xs">
            {row.original.type?.replaceAll("_ACCOUNT", "")}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return <div className="text-xs">{row.original.status}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <ActionColumn
            basePath="/dashboard/configured-payment-methods"
            id={row.original.id || "dummy__id"}
            action={A__DELETE__ConfiguredPaymentMethods}
            view={false}
            update={false}
          />
        </div>
      ),
    },
  ];
