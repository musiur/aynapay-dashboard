import { A__GET__PaymentInfo } from "../_utils/actions";
import PaymentTransactionInfoSubmitForm from "../_utils/payment-transaction-info";

const Page = async ({
  searchParams,
}: {
  searchParams: { requestId: string };
}) => {
  const apiKey = "Vls-kNB2Uk0dk7x7-zlDpublic-";
  const requestId = searchParams.requestId;

  const result = await A__GET__PaymentInfo(apiKey, requestId);
  const data = result?.data || {};
  return (
    <div>
      <PaymentTransactionInfoSubmitForm
        data={{
          requestId: data?.id,
          amount: data?.amount,
          method: data?.paymentMethod?.paymentMethod?.providerName,
          icon: data?.paymentMethod?.paymentMethod?.icon,
          type: data?.paymentMethod?.paymentMethod?.providerType,
          numberOrAddress: data?.paymentMethod?.numberOrAddress,
          apiKey,
        }}
      />
    </div>
  );
};

export default Page;
