import { DataTable } from "@/app/_utils/data-table/data-table";
import { A__GET__ConfiguredPaymentMethods } from "./actions";
import { __Columns__ConfiguredPaymentMethods } from "./configured-methods.column";

const GetConfiguredPaymentMethods = async () => {
  const result = await A__GET__ConfiguredPaymentMethods();

  return (
    <DataTable
      columns={__Columns__ConfiguredPaymentMethods}
      data={
        result?.data?.map((method: any) => {
          return {
            id: method.id,
            provider: method.paymentMethod.providerName,
            icon: method.paymentMethod.icon,
            status: method.status,
            type: method.paymentMethodProfileType,
            number: method.numberOrAddress,
          };
        }) || []
      }
      searchKey="Provider"
      className="min-w-[700px]"
    />
  );
};
export default GetConfiguredPaymentMethods;
