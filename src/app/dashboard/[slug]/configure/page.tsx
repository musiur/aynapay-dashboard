import { A__GET__PaymentMethods } from "../../_utils/payment-methods/actions";
import ConfigurePaymentMethods from "../../_utils/configured-payment-methods/post-patch-configure-methods";
import { cookies } from "next/headers";

const Configure = async () => {
  const role = cookies().get("role")?.value || "";
  const paymentMethods = await A__GET__PaymentMethods();

  let methods = paymentMethods?.data?.methods || [];

  if (role === "RECEIVER") {
    methods =
      methods?.filter(
        (item: { providerType: string }) => item.providerType !== "CRYPTO"
      ) || [];
  }

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
