import TableSkeleton from "@/app/_utils/data-table/table-skeleton";
import { Suspense } from "react";
import GetTransactions from "./get-transactions";
import { TabsContent, TabsList } from "@/components/ui/tabs";
import GetRefund from "../refund/refund-get";
import TabsTriggerCSR from "./tabs-trigger-csr";
import TabsCSR from "@/app/_utils/tabs-csr";
import CreateRefundBtn from "./create-refund-btn";
import { cookies } from "next/headers";

export default function Transactions() {
  const role = cookies().get("role")?.value || null;
  return (
    <div className="space-y-8 px-4 py-10">
      <TabsCSR>
        <TabsList>
          <TabsTriggerCSR value="transactions" text="Transactions" />
          {role === "PLATFORM" ? (
            <TabsTriggerCSR value="refund" text="Refunds" />
          ) : null}
        </TabsList>
        <TabsContent value="transactions">
          <div className="flex items-center justify-end">
            {role ? <CreateRefundBtn role={role} /> : null}
          </div>
          <div className="overflow-x-auto">
            <Suspense fallback={<TableSkeleton />}>
              <GetTransactions />
            </Suspense>
          </div>
        </TabsContent>
        {/**
         *
         * Refund History with
         *  tab - Refund and
         *  tag - issued
         *
         */}
        <TabsContent value="refund">
          <div className="overflow-x-auto">
            <Suspense fallback={<TableSkeleton />}>
              <GetRefund tag="issued" />
            </Suspense>
          </div>
        </TabsContent>
      </TabsCSR>
    </div>
  );
}
