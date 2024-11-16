import Image from "next/image";
import DocumentForm from "../../_utils/documents/post-patch-documents";
import PaymentMethodForm from "../../_utils/payment-methods/post-patch-payment-method";
import PromoForm from "../../_utils/promo-codes/post-patch-promo-code";
import RefundCreateForm from "../../_utils/refund/refund-create";
import { A__GET__RefundPaymentMethods } from "../../_utils/payment-methods/actions";
import CreateSupport from "../../_utils/support/create";

const Page = async ({
  params,
}: {
  params: any;
}) => {
  const slug = params?.slug?.replaceAll("-", "") || "promo-codes";
  const result = await A__GET__RefundPaymentMethods();
  
  const forms = {
    promocodes: <PromoForm />,
    paymentmethods: <PaymentMethodForm />,
    documents: <DocumentForm />,
    support: <CreateSupport />,
    refunds: (
      <RefundCreateForm
        methods={
          result?.data?.map((method: any) => {
            return {
              id: method.id,
              value: method.id,
              provider: method.providerName,
              icon: method.icon,
              label: (
                <div className="flex items-center gap-2">
                  <Image
                    src={method.icon}
                    alt="method-icon"
                    width={200}
                    height={200}
                    className="w-6 h-6 rounded-md"
                  />
                  <span>{method.providerName}</span>
                </div>
              ),
            };
          }) || []
        }
      />
    ),
  };
  return (
    <div className="p-4">
      {
        // @ts-ignore
        forms[slug]
      }
    </div>
  );
};

export default Page;
