import { DataTable } from "@/app/_utils/data-table/data-table";
import { __Columns__DepositRequests } from "./deposit-request.column";
import { A__GET__AllDepositRequests } from "./action";

const GetDepositRequests = async () => {
  const result = await A__GET__AllDepositRequests();

  return (
    <DataTable
      columns={__Columns__DepositRequests}
      data={
        result?.data?.map((item: any) => {
          const {
            id,
            amount,
            senderTransactionId,
            paymentMethodTitle,
            status,
            createdAt,
            updatedAt,
          } = item;
          return {
            id,
            method: paymentMethodTitle,
            transactionId: senderTransactionId,
            amount,
            status,
            createdAt,
            updatedAt,
          };
        }) || []
      }
      searchKey="Transaction Id"
      className="min-w-[700px]"
    />
  );
};
export default GetDepositRequests;
