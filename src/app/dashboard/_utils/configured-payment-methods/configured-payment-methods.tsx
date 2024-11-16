import TableSkeleton from "@/app/_utils/data-table/table-skeleton";
import { Suspense } from "react";
import CreateLink from "@/app/_utils/data-table/create-link";
import GetConfiguredPaymentMethods from "./get-configured-methods";

const ConfiguredPaymentMethods = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <CreateLink
          link="/dashboard/configured-payment-methods/configure"
          text="Configure New Method"
        />
      </div>
      <div className="overflow-x-auto">
        <Suspense fallback={<TableSkeleton />}>
          <GetConfiguredPaymentMethods />
        </Suspense>
      </div>
    </div>
  );
};

export default ConfiguredPaymentMethods;
