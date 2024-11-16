import TableSkeleton from "@/app/_utils/data-table/table-skeleton";
import { Suspense } from "react";
import GetRefund from "./refund-get";
import { TabsContent, TabsList } from "@/components/ui/tabs";
import TabsTriggerCSR from "../trasactions/tabs-trigger-csr";
import TabsCSR from "@/app/_utils/tabs-csr";
import { cookies } from "next/headers";

export default function Refunds() {
  const role = cookies().get("role")?.value || null;
  return (
    <div className="space-y-8 px-4 py-10">
      <TabsCSR>
        <TabsList>
          {role === "RECEIVER" ? (
            <TabsTriggerCSR value="refund" text="Offers" />
          ) : null}
          <TabsTriggerCSR value="earn" text="Earnings" />
        </TabsList>

        <TabsContent value="refund">
          <div className="overflow-x-auto">
            <Suspense fallback={<TableSkeleton />}>
              <GetRefund tag="all" />
            </Suspense>
          </div>
        </TabsContent>

        <TabsContent value="earn">
          <div className="overflow-x-auto">
            <Suspense fallback={<TableSkeleton />}>
              <GetRefund tag="own" />
            </Suspense>
          </div>
        </TabsContent>
      </TabsCSR>
    </div>
  );
}
