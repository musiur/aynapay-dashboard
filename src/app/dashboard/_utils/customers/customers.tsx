import TableSkeleton from "@/app/_utils/data-table/table-skeleton";
import { Suspense } from "react";
// import CreateLink from "@/app/_utils/data-table/create-link";
import GetCustomers from "./get-customers";
import { AddUser } from "@/components/modals/add-user";

export default function Customers() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        {/* <CreateLink
          link="/dashboard/promo-codes/create"
          text="Add Promo Code"
        /> */}
        <AddUser />
      </div>
      <div className="overflow-x-auto">
        <Suspense fallback={<TableSkeleton />}>
          <GetCustomers />
        </Suspense>
      </div>
    </div>
  );
}
