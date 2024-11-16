import TableSkeleton from "@/app/_utils/data-table/table-skeleton";
import { Suspense } from "react";
import CreateLink from "@/app/_utils/data-table/create-link";
import GetDocument from "./get-documents";

export default function Documents() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <CreateLink link="/dashboard/documents/create" text="Add document" />
      </div>
      <div className="overflow-x-auto">
        <Suspense fallback={<TableSkeleton />}>
          <GetDocument />
        </Suspense>
      </div>
    </div>
  );
}
