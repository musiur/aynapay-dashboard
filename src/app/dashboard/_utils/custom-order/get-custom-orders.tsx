import { DataTable } from "@/app/_utils/data-table/data-table";
import { __Columns__CustomOrder } from "./custom-order.column";
import { A__GET__CustomOrders } from "./actions";

const GetCustomOrders = async () => {
  const result = await A__GET__CustomOrders();
  return (
    <DataTable
      columns={__Columns__CustomOrder}
      data={result?.data?.coupons || []}
      searchKey="Custom Order"
      className="min-w-[700px]"
    />
  );
};
export default GetCustomOrders;
