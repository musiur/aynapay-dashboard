import TableSkeleton from "@/app/_utils/data-table/table-skeleton";
import { Suspense } from "react";
import CreateLink from "@/app/_utils/data-table/create-link";
import GetPaymentMethods from "./get-payment-methods";

export default function PaymentMethods() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <CreateLink
          link="/dashboard/payment-methods/create"
          text="Add Payment Method"
        />
      </div>
      <div className="overflow-x-auto">
        <Suspense fallback={<TableSkeleton />}>
          <GetPaymentMethods />
        </Suspense>
      </div>
    </div>
  );
}
