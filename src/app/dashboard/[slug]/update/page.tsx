import { cookies } from "next/headers";
import { A__GET__Customer } from "../../_utils/custom-order/action";
import CustomerDataUpdateForm from "../../_utils/customers/patch-form-customer";
import { A__GET__SingleTransactionInfo } from "../../_utils/deposit-requests/action";
import { DepositStatusUpdate } from "../../_utils/deposit-requests/deposit-status-update";
import { A__GET__Document } from "../../_utils/documents/actions";
import DocumentForm from "../../_utils/documents/post-patch-documents";
import { A__GET__PaymentMethod } from "../../_utils/payment-methods/actions";
import PaymentMethodForm from "../../_utils/payment-methods/post-patch-payment-method";
import { A__GET__PromoCode } from "../../_utils/promo-codes/actions";
import PromoForm from "../../_utils/promo-codes/post-patch-promo-code";
import { WithdrawStatusUpdate } from "../../_utils/withdraw-requests/withdraw-status-update";
import { A__GET__TransactionView } from "../../_utils/trasactions/actions";

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { id: string };
}) => {
  const slug = params?.slug?.replaceAll("-", ""); //  || "promo-codes"
  const role = cookies().get("role")?.value;

  const actions = {
    promocodes: A__GET__PromoCode,
    customers: A__GET__Customer,
    paymentmethods: A__GET__PaymentMethod,
    documents: A__GET__Document,
    depositrequests: A__GET__SingleTransactionInfo,
    withdrawrequests: (id: string) => A__GET__TransactionView(id, "withdraw"),
    transactions: A__GET__SingleTransactionInfo,
  };

  // @ts-ignore
  const result = await actions[slug](searchParams.id);

  const forms = {
    promocodes: <PromoForm defaultValues={result?.data || {}} />,
    customers: (
      <CustomerDataUpdateForm
        defaultValues={result?.data || {}}
        roleEditable={role ? ["ADMIN", "MODERATOR"].includes(role) : false}
      />
    ),
    paymentmethods: <PaymentMethodForm defaultValues={result?.data || {}} />,
    documents: <DocumentForm defaultValues={result?.data || {}} />,
    depositrequests: (
      <DepositStatusUpdate
        defaultValues={result?.data || {}}
        backlink="/dashboard/deposit-requests"
      />
    ),
    transactions: (
      <DepositStatusUpdate
        defaultValues={result?.data || {}}
        backlink="/dashboard/transactions?tab=transactions"
        payment={true}
      />
    ),
    withdrawrequests: (
      <WithdrawStatusUpdate
        defaultValues={result?.data || {}}
        backlink="/dashboard/withdraw-requests"
      />
    ),
  };
  return (
    <div className="p-4">
      {
        // @ts-ignore
        result?.success ? forms[slug] : null
      }
    </div>
  );
};

export default Page;
