import { DataTable } from "@/app/_utils/data-table/data-table";
import {
  __Columns__Refund,
  __Columns__RefundEarning,
  __Columns__RefundIssued,
} from "./refund.column";
import { A__GET__Refunds } from "./_utils/actions";

const GetRefund = async ({
  tag = "all",
}: {
  tag: "own" | "all" | "issued";
}) => {
  const result = await A__GET__Refunds(tag);
  const columns = {
    own: __Columns__RefundEarning,
    all: __Columns__Refund,
    issued: __Columns__RefundIssued,
  };
  const searchkey = {
    own: "ID",
    all: "ID",
    issued: "Reference Transaction Id",
  }

  return (
    <DataTable
      columns={columns[tag]}
      data={result?.data?.data || []}
      searchKey={searchkey[tag]}
      className="min-w-[700px]"
    />
  );
};
export default GetRefund;
