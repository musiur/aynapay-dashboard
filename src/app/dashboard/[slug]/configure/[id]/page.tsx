// import { A__GET__ProfileInfo } from "../../_utils/settings/utils/actions";

import ConfigurePaymentMethods from "@/app/dashboard/_utils/configured-payment-methods/post-patch-configure-methods";
import {
  A__GET__PaymentMethod,
  A__GET__PaymentMethods,
} from "@/app/dashboard/_utils/payment-methods/actions";

const Configure = async ({ params }: { params: { id: string } }) => {
  // const userdata = await A__GET__ProfileInfo();
  // const paymentMethod = await A__GET__PaymentMethod(params?.id || "");
  const paymentMethods = await A__GET__PaymentMethods();
  let methods = paymentMethods?.data?.methods || [];

  methods = methods.map((method: any) => {
    return {
      label: method.providerName,
      value: method.id,
      type: method.providerType,
    };
  });

  return (
    <div className="p-4 md:p-8">
      <ConfigurePaymentMethods defaultMethods={methods} />
    </div>
  );
};

export default Configure;
