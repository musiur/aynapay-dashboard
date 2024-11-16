import { DataTable } from "@/app/_utils/data-table/data-table";
import { A__GET__MyTransactions } from "./actions";
import { __Columns__Transactions } from "./trasanction.column";
import { cookies } from "next/headers";

const GetTransactions = async () => {
  const role = cookies().get("role")?.value || "RECEIVER";
  const result = await A__GET__MyTransactions();
  const access = ["ADMIN", "MODERATOR"].includes(role);
  return (
    <DataTable
      columns={__Columns__Transactions}
      data={
        result?.data?.map((item: any) => {
          const { id, amount, type, createdAt } = item;
          return {
            id,
            trnxId: item?.transaction?.id,
            transactionId: access ? id : item?.transactionId || item?.refundRequestId || item?.withdrawRequestId,
            method:
              access
                ? item?.paymentMethodTitle
                : item?.transaction?.paymentMethodTitle,
            amount,
            status: access ? item?.status : item?.transaction?.status,
            type,
            transactionType:
              access
                ? item?.transactionType
                : item?.transaction?.transactionType,
            senderId:
              access ? item?.senderUID : item?.transaction?.senderUID,
            receiverId: item?.transaction?.receiverUID,
            userId: item?.uid,
            createdAt,
            description: item?.description || "",
            providerType: item?.paymentMethod?.providerType,
          };
        }) || []
      }
      searchKey="Transaction Id"
      className="min-w-[700px]"
    />
    
  );
};
export default GetTransactions;
