import ApiKeys from "../_utils/api-keys/api-keys";
import Blogs from "../_utils/blogs/blogs";
import ConfiguredPaymentMethods from "../_utils/configured-payment-methods/configured-payment-methods";
import CustomOrder from "../_utils/custom-order/custom-order";
import Customers from "../_utils/customers/customers";
import DepositRequests from "../_utils/deposit-requests/deposit-requests";
import Documents from "../_utils/documents/documents";
import Notifications from "../_utils/notifications/notifications";
import Overview from "../_utils/overview/overview";
import PaymentMethods from "../_utils/payment-methods/payment-methods";
import PromoCode from "../_utils/promo-codes/promo-codes";
import Refunds from "../_utils/refund/refunds";
import Settings from "../_utils/settings/settings";
import Supports from "../_utils/support/supports";
import Transactions from "../_utils/trasactions/transactions";
import WalletOverview from "../_utils/wallet/wallet-overview";
import WithdrawRequests from "../_utils/withdraw-requests/withdraw-requests";

const Page = ({ params }: { params: { slug: string } }) => {
  const path = params.slug.replaceAll("-", "");
  return (
    //   @ts-ignore
    components[path || "customers"]
  );
};
export default Page;

const components = {
  customers: <Customers />,
  paymentmethods: <PaymentMethods />,
  promocodes: <PromoCode />,
  settings: <Settings />,
  transactions: <Transactions />,
  apikeys: <ApiKeys />,
  notifications: <Notifications />,
  blogs: <Blogs />,
  customorder: <CustomOrder />,
  support: <Supports />,
  overview: <Overview />,
  documents: <Documents />,
  wallet: <WalletOverview />,
  configuredpaymentmethods: <ConfiguredPaymentMethods />,
  depositrequests: <DepositRequests />,
  withdrawrequests: <WithdrawRequests />,
  refunds: <Refunds />,
};
