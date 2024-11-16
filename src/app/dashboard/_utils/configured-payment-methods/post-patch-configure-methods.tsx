"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import InputX from "@/components/molecules/input.x";
import SubmitX from "@/components/molecules/submit.x";
import { A__POST__PaymentMethodConfigure } from "./actions";
import ResponseX from "@/components/molecules/response.x";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FormSchema = z.object({
  paymentMethodId: z.string().min(1),
  numberOrAddress: z.string().min(11),
  qrCode: z.string().optional(),
  paymentMethodProfileType: z.string().min(1),
});

export default function ConfigurePaymentMethods({
  defaultMethods = [],
  defaultValues,
}: {
  defaultMethods: any;
  defaultValues?: any;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues || {
      paymentMethodId: "",
      numberOrAddress: "",
      qrCode: "",
      paymentMethodProfileType: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await A__POST__PaymentMethodConfigure(data);

    ResponseX({ title: "Payment Method Configuration", result });
    if (result.success) {
      router.push("/dashboard/configured-payment-methods");
    }
  }

  const LabelMaker = () => {
    const labels = {
      MFS: "Phone Number",
      BANK: "Account Number",
      CRYPTO: "Wallet Address",
      CARD: "Card Number",
      OTHERS: "ID Number/ID Name/Username",
    };
    // @ts-ignore
    return labels[
      defaultMethods.filter(
        (method: { value: string }) =>
          method.value === form.watch("paymentMethodId")
      )[0]?.type || "MFS"
    ];
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 bg-white p-4 rounded-lg"
      >
        <InputX
          form={form}
          name="paymentMethodId"
          label="Payment Method"
          type="select"
          options={defaultMethods}
        />
        <InputX
          form={form}
          name="paymentMethodProfileType"
          label="Payment Method Profile Type"
          type="select"
          options={Options__PaymentMethodTypes}
        />

        {/**
         * Label will be changed according to paymentMethod value
         * e.g Crypto ----------------- Wallet address
         *     Card ------------------- Card Number
         *     Mobile Banking --------- Phone Number
         *     Bank ------------------- Account Number
         */}
        <InputX form={form} name="numberOrAddress" label={LabelMaker()} />
        {/* <InputX form={form} name="qrCode" label="QR Code" /> */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/configured-payment-methods">
            <Button variant="outline">Back</Button>
          </Link>
          <SubmitX pending={form.formState.isSubmitting} text="Configure" />
        </div>
      </form>
    </Form>
  );
}

const Options__PaymentMethodTypes = [
  {
    label: "Personal Account",
    value: "PERSONAL_ACCOUNT",
  },
  {
    label: "Business Account",
    value: "BUSINESS_ACCOUNT",
  },
  {
    label: "Agent Account",
    value: "AGENT_ACCOUNT",
  },
  {
    label: "Marchant Account",
    value: "MERCHANT_ACCOUNT ",
  },
];
