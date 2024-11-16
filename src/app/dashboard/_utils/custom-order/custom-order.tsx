import TableSkeleton from "@/app/_utils/data-table/table-skeleton";
import { Suspense } from "react";
import CreateLink from "@/app/_utils/data-table/create-link";
import GetCustomOrders from "./get-custom-orders";

export default function CustomOrders() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <CreateLink link="/dashboard/custom-orders/create" text="Add Order" />
      </div>
      <div className="overflow-x-auto">
        <Suspense fallback={<TableSkeleton />}>
          <GetCustomOrders />
        </Suspense>
      </div>
    </div>
  );
}
