import { T__Schema__PaymentMethods } from "@/app/dashboard/_utils/payment-methods/payment-methods.column";
import Image from "next/image";

const PaymentCard = ({ data }: { data: T__Schema__PaymentMethods }) => {
  const { id, icon, providerName, providerType } = data;
  return (
    <div className="border-2 hover:shadow rounded-lg p-4 hover:border-primary/30 md:cursor-pointer flex  items-center justify-center gap-4 min-w-[180px]">
      <Image
        // @ts-ignore
        src={icon}
        alt=""
        width={300}
        height={300}
        className="w-12 h-auto rounded-lg"
      />
      <div>
        <h1 className="font-semibold text-lg">{providerName}</h1>
        <p className="text-sm">{providerType}</p>
      </div>
    </div>
  );
};

export default PaymentCard;
