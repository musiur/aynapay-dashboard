import { A__GET__WalletDepositInfo } from "@/app/dashboard/_utils/wallet/actions";
import DepositTransactionInfoSubmitForm from "../_utils/deposit-transaction-info";

const Page = async ({
  searchParams,
}: {
  searchParams: { requestId: string };
}) => {
  const requestId = searchParams.requestId;
  const result = await A__GET__WalletDepositInfo(requestId);
  const data = result?.data || {};
  return (
    <div>
      <DepositTransactionInfoSubmitForm
        data={{
          requestId,
          amount: data?.amount,
          method: data?.paymentMethod?.paymentMethod?.providerName,
          icon: data?.paymentMethod?.paymentMethod?.icon,
          type: data?.paymentMethod?.paymentMethod?.providerType,
          numberOrAddress: data?.paymentMethod?.numberOrAddress,
        }}
      />
    </div>
  );
};

export default Page;
