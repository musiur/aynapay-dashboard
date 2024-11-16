import { DataTable } from "@/app/_utils/data-table/data-table";
import { A__GET__AllWithdrawRequests } from "./action";
import { __Columns__WithdrawRequests } from "./withdraw-request.column";

const GetWithdrawRequests = async () => {
  const result = await A__GET__AllWithdrawRequests();
  return (
    <DataTable
      columns={__Columns__WithdrawRequests}
      data={
        result?.data?.data?.map((item: any) => {
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
      searchKey="Id"
      className="min-w-[700px]"
    />
  );
};
export default GetWithdrawRequests;
