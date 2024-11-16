import { A__GET__PaymentMethods } from "../dashboard/_utils/payment-methods/actions";
import { A__GET__AvailableAdminsPaymentMethods } from "../dashboard/_utils/wallet/actions";
import RequestDeposit from "./_utils/request-deposit";

const Page = async () => {
  const paymentMethods = await A__GET__AvailableAdminsPaymentMethods();
  const othersPaymentMethods = await A__GET__PaymentMethods();

  let methods = paymentMethods?.data || [];
  let otherMethods = othersPaymentMethods?.data?.methods || [];

  if (methods.length) {
    methods = methods.map((method: any) => {
      const temp = {
        ...method,
        ...method.paymentMethod,
      };
      delete temp.paymentMethod;
      return temp;
    });
  }

  return (
    <div>
      <RequestDeposit methods={methods} otherMethods={otherMethods} />
    </div>
  );
};

export default Page;
