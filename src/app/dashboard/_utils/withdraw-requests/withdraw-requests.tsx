import TableSkeleton from "@/app/_utils/data-table/table-skeleton";
import { Suspense } from "react";
import GetWithdrawRequests from "./get-withdraw-requests";

export default function WithdrawRequests() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
      </div>
      <div className="overflow-x-auto">
        <Suspense fallback={<TableSkeleton />}>
          <GetWithdrawRequests />
        </Suspense>
      </div>
    </div>
  );
}
