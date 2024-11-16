import { DataTable } from "@/app/_utils/data-table/data-table";
import { A__GET__Customers } from "./action";
import { __Columns__Customers } from "./order.column";

const GetCustomers = async () => {
  const result = await A__GET__Customers();
  return (
    <DataTable
      columns={__Columns__Customers}
      data={result?.data?.users || []}
      searchKey="Coupon Code"
      className="min-w-[700px]"
    />
  );
};
export default GetCustomers;
