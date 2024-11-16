"use client";

import { z } from "zod";
import { Form } from "@/components/ui/form";
import BrandLogo from "@/components/assets/brand";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputX from "@/components/molecules/input.x";
import ResponseX from "@/components/molecules/response.x";
import { A__POST__PaymentTransactionInfo } from "./actions";
import ApiCopy from "@/app/dashboard/_utils/api-keys/api-copy";
import SubmitX from "@/components/molecules/submit.x";

const FormSchema = z.object({
  transactionId: z.string().min(1),
  transactionSource: z.string().min(1),
});

const PaymentTransactionInfoSubmitForm = ({
  data,
}: {
  data: {
    requestId: string;
    amount: number;
    method: string;
    apiKey: string;
    icon: string;
    type: string;
    numberOrAddress: string;
  };
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const LabelMaker = () => {
    const labels = {
      MFS: "Phone Number",
      BANK: "Account Number",
      CRYPTO: "Wallet Address",
      CARD: "Card Number",
      OTHERS: "ID Number/ID Name/Username",
    };
    // @ts-ignore
    return labels[data.type];
  };
  const { requestId, amount, method, apiKey, icon, numberOrAddress } = data;
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await A__POST__PaymentTransactionInfo({
      requestId,
      ...data,
      apiKey,
    });

    ResponseX({ title: "Payment Transaction Information", result });
  }
  return (
    <div className="grid grid-cols-1 gap-4 min-h-screen bg-primary p-4 text-white">
      <div className="max-w-[440px] mx-auto text-center mb-4">
        <div className="flex items-center justify-center pb-8">
          <Image
            src={icon || "/vercel.svg"}
            alt="method"
            width={500}
            height={500}
            className="w-32 h-32 rounded-full bg-white p-2 "
          />
        </div>
        {/* <div className="text-3xl mb-4">29:30</div> */}
        <div className="bg-white rounded-lg md:rounded-2xl p-6 md:p-12 text-black">
          <div className="text-xl font-semibold mb-2">Amount: BDT {amount}</div>
          <div className="mb-4">
            Please make payment to the following{" "}
            <div className="font-bold text-primary">
              {method}-{LabelMaker()}
            </div>
          </div>

          <div className="inline-flex border rounded-md items-center justify-center gap-2 bg-muted">
            <code className="font-mono text-lg pl-3">{numberOrAddress}</code>
            <ApiCopy apiKey={numberOrAddress} />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-y-4 text-left pt-8"
            >
              <InputX form={form} name="transactionId" label="Transaction ID" />
              <InputX
                form={form}
                name="transactionSource"
                label="Transaction Source"
              />
              <SubmitX pending={form.formState.isSubmitting} text="Submit" />
            </form>
          </Form>
          <div className="mt-10">
            <BrandLogo className="max-w-[120px] h-auto mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTransactionInfoSubmitForm;
