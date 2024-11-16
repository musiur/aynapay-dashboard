import Image from "next/image";
import { A__GET__ConfiguredPaymentMethods } from "../../_utils/configured-payment-methods/actions";
import WithdrawForm from "../../_utils/wallet/withdraw-form";

const Page = async ({ searchParams }: { searchParams: { active: boolean } }) => {
  const result = await A__GET__ConfiguredPaymentMethods();
  return (
    <div>
      <WithdrawForm
        methods={
          result?.data?.map((method: any) => {
            return {
              id: method.id,
              value: method.id,
              provider: method.paymentMethod.providerName,
              icon: method.paymentMethod.icon,
              label: (
                <div className="flex items-center gap-2">
                  <Image
                    src={method.paymentMethod.icon}
                    alt="method-icon"
                    width={200}
                    height={200}
                    className="w-6 h-6 rounded-md"
                  />
                  <span>{method.paymentMethod.providerName}</span>
                  <span className="text-xs text-gray-400 capitalize">
                    ( {method.numberOrAddress}{" "}
                    {method?.paymentMethodProfileType
                      ?.replaceAll("_ACCOUNT", " ")
                      ?.toLowerCase()}
                    )
                  </span>
                </div>
              ),
            };
          }) || []
        }
      />
    </div>
  );
};

export default Page;
