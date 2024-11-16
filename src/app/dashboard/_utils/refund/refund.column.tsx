"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import ActionColumn from "@/app/_utils/data-table/action-column";
import Image from "next/image";
import { format } from "date-fns";
import RefundAccept from "./_utils/refund-accept";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RefundActionBlock from "./_utils/refund-action-block";

export const __Schema__Refund = z.object({
  id: z.string(),
  amount: z.number(),
  processFess: z.number(),
  referenceTransactionId: z.string(),
  platformPaymentMethod: z.object({
    icon: z.string(),
    name: z.string(),
  }),
  status: z.enum(["Pending", "Completed", "Failed", "Hold"]),
  accountType: z.enum(["PERSONAL_ACCOUNT", "BUSINESS_ACCOUNT"]),
  bankNumberOrAddress: z.string(),
  paidBy: z.string().nullable(),
  createdBy: z.string(),
  paymentProofScreenShot: z.string(),
  paymentTxnId: z.string(),
  paymentUserSource: z.string(),
  refundReason: z.string(),
  activeSession: z.string(),
  note: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type T__Schema__Refund = z.infer<typeof __Schema__Refund>;

export const __Columns__Refund: ColumnDef<T__Schema__Refund>[] = [
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
    header: "ID",
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => {
      return <div>{format(new Date(row?.original?.updatedAt), "PPP")}</div>;
    },
  },

  {
    accessorKey: "amount",
    header: "Amount (BDT)",
    cell: ({ row }) => row.original.amount,
  },
  // {
  //   accessorKey: "referenceTransactionId",
  //   header: "Ref. Transaction ID",
  //   cell: ({ row }) => row.original.referenceTransactionId,
  // },
  // {
  //   accessorKey: "platformPaymentMethod",
  //   header: "Method",
  //   cell: ({ row }) => {
  //     const { icon, name } = row.original.platformPaymentMethod;
  //     return (
  //       <div className="flex items-center gap-2">
  //         <Image
  //           src={icon}
  //           alt="icon"
  //           width={100}
  //           height={100}
  //           className="w-6 h-6 rounded-full"
  //         />
  //         <span>{name}</span>
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => row.original.status,
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start gap-2">
          <ActionColumn
            basePath="/dashboard/refunds"
            id={row.original.id || "dummy__id"}
            update={false}
          />
          <RefundActionBlock row={row} />
        </div>
      );
    },
  },
];


export const __Columns__RefundEarning: ColumnDef<T__Schema__Refund>[] = [
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
    header: "ID",
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => {
      return <div>{format(new Date(row?.original?.updatedAt), "PPP")}</div>;
    },
  },

  {
    accessorKey: "amount",
    header: "Amount (BDT)",
    cell: ({ row }) => row.original.amount,
  },
  // {
  //   accessorKey: "referenceTransactionId",
  //   header: "Ref. Transaction ID",
  //   cell: ({ row }) => row.original.referenceTransactionId,
  // },
  // {
  //   accessorKey: "platformPaymentMethod",
  //   header: "Method",
  //   cell: ({ row }) => {
  //     const { icon, name } = row.original.platformPaymentMethod;
  //     return (
  //       <div className="flex items-center gap-2">
  //         <Image
  //           src={icon}
  //           alt="icon"
  //           width={100}
  //           height={100}
  //           className="w-6 h-6 rounded-full"
  //         />
  //         <span>{name}</span>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => row.original.status,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start gap-2">
          <ActionColumn
            basePath="/dashboard/refunds"
            id={row.original.id || "dummy__id"}
            update={false}
          />
          <RefundActionBlock row={row} />
        </div>
      );
    },
  },
];

export const __Columns__RefundIssued: ColumnDef<T__Schema__Refund>[] = [
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
    header: "ID",
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => {
      return <div>{format(new Date(row?.original?.updatedAt), "PPP")}</div>;
    },
  },

  {
    accessorKey: "amount",
    header: "Amount (BDT)",
    cell: ({ row }) => row.original.amount,
  },
  {
    accessorKey: "referenceTransactionId",
    header: "Ref. Transaction ID",
    cell: ({ row }) => row.original.referenceTransactionId,
  },
  // {
  //   accessorKey: "platformPaymentMethod",
  //   header: "Method",
  //   cell: ({ row }) => {
  //     const { icon, name } = row.original.platformPaymentMethod;
  //     return (
  //       <div className="flex items-center gap-2">
  //         <Image
  //           src={icon}
  //           alt="icon"
  //           width={100}
  //           height={100}
  //           className="w-6 h-6 rounded-full"
  //         />
  //         <span>{name}</span>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => row.original.status,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start gap-2">
          <ActionColumn
            basePath="/dashboard/refunds"
            id={row.original.id || "dummy__id"}
            update={false}
          />
          <RefundActionBlock row={row} />
        </div>
      );
    },
  },
];

