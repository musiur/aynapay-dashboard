import { DataTable } from "@/app/_utils/data-table/data-table";
import { __Columns__PaymentMethods } from "./payment-methods.column";
import { A__GET__PaymentMethods } from "./actions";

const GetPaymentMethods = async () => {
  const result = await A__GET__PaymentMethods();
  
  return (
    <DataTable
      columns={__Columns__PaymentMethods}
      data={result?.data?.methods || []}
      searchKey="Provider Name"
      className="min-w-[700px]"
    />
  );
};
export default GetPaymentMethods;
