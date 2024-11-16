import { DataTable } from "@/app/_utils/data-table/data-table";
import { __Columns__PromoCode } from "./promo.column";
import { A__GET__PromoCodes } from "./actions";

const GetPromoCodes = async () => {
  const result = await A__GET__PromoCodes();
  return (
    <DataTable
      columns={__Columns__PromoCode}
      data={result?.data?.coupons || []}
      searchKey="Coupon Code"
      className="min-w-[700px]"
    />
  );
};
export default GetPromoCodes;
