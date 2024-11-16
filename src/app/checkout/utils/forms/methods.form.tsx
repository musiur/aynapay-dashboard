import { A__GET__PaymentMethods } from "@/app/dashboard/_utils/payment-methods/actions";
import PaymentCard from "../components/payment-card";
import { T__Schema__PaymentMethods } from "@/app/dashboard/_utils/payment-methods/payment-methods.column";

const MethodsForm = async () => {
  let methods: T__Schema__PaymentMethods[] = [];
  const result = await A__GET__PaymentMethods();
  methods =
    result?.data?.methods?.filter(
      (method: { status: string }) => method.status === "ACTIVE"
    ) || [];
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-4">
        {methods?.length
          ? methods?.map((method: T__Schema__PaymentMethods) => {
              return <PaymentCard key={method.id} data={method} />;
            })
          : null}
      </div>
      <p>Please Choose Payment Method</p>
    </div>
  );
};

export default MethodsForm;
