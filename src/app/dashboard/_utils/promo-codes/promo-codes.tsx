import TableSkeleton from "@/app/_utils/data-table/table-skeleton";
import { Suspense } from "react";
import GetPromoCodes from "./get-promo-codes";
import CreateLink from "@/app/_utils/data-table/create-link";

export default function PromoCode() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <CreateLink
          link="/dashboard/promo-codes/create"
          text="Add Promo Code"
        />
      </div>
      <div className="overflow-x-auto">
        <Suspense fallback={<TableSkeleton />}>
          <GetPromoCodes />
        </Suspense>
      </div>
    </div>
  );
}
