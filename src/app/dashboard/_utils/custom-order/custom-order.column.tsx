"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import ActionColumn from "@/app/_utils/data-table/action-column";
import { A__DELETE__CustomOrder } from "./actions";

export const __Schema__CustomOrder = z.object({
  id: z.string().optional(),
  couponCode: z.string(),
  discountType: z.enum(["FIXED", "PERCENTAGE"]),
  discountAmount: z.number(),
  minOrderAmount: z.number(),
  maxDiscountAmount: z.number(),
  usageLimit: z.number(),
  expireDate: z.date(),
});

export type T__Schema__CustomOrder = z.infer<typeof __Schema__CustomOrder>;

export const __Columns__CustomOrder: ColumnDef<T__Schema__CustomOrder>[] = [
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
    accessorKey: "couponCode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Coupon Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.original.couponCode,
  },
  {
    accessorKey: "discountType",
    header: "Discount Type",
    cell: ({ row }) => row.original.discountType,
  },
  {
    accessorKey: "discountAmount",
    header: "Discount Amount",
    cell: ({ row }) => row.original.discountAmount,
  },
  {
    accessorKey: "minOrderAmount",
    header: "Min Order Amount",
    cell: ({ row }) => row.original.minOrderAmount,
  },
  {
    accessorKey: "maxDiscountAmount",
    header: "Max Discount Amount",
    cell: ({ row }) => row.original.maxDiscountAmount,
  },
  {
    accessorKey: "usageLimit",
    header: "Usage Limit",
    cell: ({ row }) => row.original.usageLimit,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionColumn
        basePath="/dashboard/promo-codes"
        id={row.original.id || "dummy__id"}
        action={A__DELETE__CustomOrder}
        view={false}
      />
    ),
  },
];
