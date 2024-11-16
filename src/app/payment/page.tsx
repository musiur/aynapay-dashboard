import { A__GET__AllPaymentMethods } from "./_utils/actions";
import CreatePayment from "./_utils/create-payment";

const Page = async () => {
  const apiKey = "Vls-kNB2Uk0dk7x7-zlDpublic-";
  const paymentMethods = await A__GET__AllPaymentMethods(apiKey);
  let methods = paymentMethods?.data || [];
  methods = methods.map((method: any) => {
    return {
      label: method.paymentMethod.providerName,
      value: method.id,
      type: method.providerType,
    };
  });
  return (
    <div>
      <CreatePayment defaultMethods={methods} apiKey={apiKey} />
    </div>
  );
};

export default Page;
