"use client";

import { z } from "zod";
import { Form } from "@/components/ui/form";
import BrandLogo from "@/components/assets/brand";
import Image from "next/image";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputX from "@/components/molecules/input.x";
import ResponseX from "@/components/molecules/response.x";
import ApiCopy from "@/app/dashboard/_utils/api-keys/api-copy";
import SubmitX from "@/components/molecules/submit.x";
import {
  A__POST__WalletDepositTransactionInfoSubmit,
  A__POST__WalletDepositTransactionInfoSubmitByCrypto,
} from "@/app/dashboard/_utils/wallet/actions";
import { useRouter } from "next/navigation";
import QRCode from "./wallet-qr-code.png";

const FormSchema = z.object({
  transactionId: z.string().min(1),
  transactionSource: z.string().min(1),
});

const DepositTransactionInfoSubmitForm = ({
  data,
}: {
  data: {
    requestId: string;
    amount: number;
    method: string;
    icon: string;
    type: string;
    numberOrAddress: string;
  };
}) => {
  const router = useRouter();
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
  const { requestId, amount, method, icon, numberOrAddress } = data;
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    // A__POST__WalletDepositTransactionInfoSubmitByCrypto

    const payload = {
      requestId,
      ...values,
    };

    const result =
      data.type === "CRYPTO"
        ? await A__POST__WalletDepositTransactionInfoSubmitByCrypto(payload)
        : await A__POST__WalletDepositTransactionInfoSubmit(payload);

    ResponseX({ title: "Payment Transaction Information", result });
    router.push("/dashboard/transactions?tab=transactions");
  }
  return (
    <div className="grid grid-cols-1 gap-4 min-h-screen bg-gradient-to-br from-primary to-primary/30 p-4 text-white">
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

        <div className="bg-white rounded-lg md:rounded-2xl p-6 md:p-12 text-black">
          <div className="text-xl font-semibold mb-2">Amount: BDT {amount}</div>
          <div className="mb-4">
            <div>Please proceed with your deposit using <span className="font-bold text-primary">{method === "USDT" ? "TRC20-USDT" : method} {LabelMaker()} </span>provided below.</div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <Image src={QRCode} alt="method" width={500} height={500} className="w-32 h-32 rounded-md bg-white p-2" />
            <div className="inline-flex border rounded-md items-center justify-center gap-2 bg-muted">
              <code className="font-mono text-sm pl-3 break-all">{numberOrAddress}</code>
              <ApiCopy apiKey={numberOrAddress} />
            </div>

          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-y-4 text-left pt-8"
            >
              <InputX form={form} name="transactionId" label="Transaction ID" tooltip="Enter the transaction ID you received after payment" />
              <InputX
                form={form}
                name="transactionSource"
                label="Transaction Source"
                tooltip="Enter the transaction source you received after payment"
                placeholder="e.g. Binance, Trust wallet, etc."
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

export default DepositTransactionInfoSubmitForm;
