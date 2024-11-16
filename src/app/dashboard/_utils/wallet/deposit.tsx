/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import InputX from "@/components/molecules/input.x";
import SubmitX from "@/components/molecules/submit.x";
import ResponseX from "@/components/molecules/response.x";
import {
  A__POST__WalletDepositRequest,
  A__POST__WalletDepositTransactionInfoSubmitByCrypto,
} from "./actions";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  amount: z.number().min(1),
  userPaymentMethodId: z.string().min(1),
  // paymentMethodType: z.string().min(1),
  transactionId: z.string().min(1),
  transactionSource: z.string().min(1),
});

export default function Deposit({
  defaultMethods = [],
}: {
  defaultMethods?: any;
}) {
  /**
   * 1_____Admins Available Methods Fetch
   * 2_____Receiver List Based On Payment Method Selection
   * 3_____Transaction Information from Depositor
   * 4_____Overview of Deposit
   * 5_____Submit Deposit
   */

  const [steps, setSteps] = useState({
    request: {
      completed: false,
      requestId: null,
    },
    submit: {
      completed: false,
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 1,
      userPaymentMethodId: "",
      // paymentMethodType: "MFS",
      transactionId: "",
      transactionSource: "",
    },
  });

  // const tempMethods = ["MFS", "Bank", "Crypto"];

  const RequestForDeposit = async () => {
    const result = await A__POST__WalletDepositRequest({
      amount: form.getValues("amount"),
      userPaymentMethodId: form.getValues("userPaymentMethodId"),
    });

    if (result.success) {
      setSteps({
        ...steps,
        request: {
          completed: true,
          requestId: result.data.id,
        },
      });
    }
  };

  useEffect(() => {
    if (
      form.getValues("userPaymentMethodId") &&
      !steps.request.completed &&
      form.getValues("amount")
    ) {
      /**
       * Fetch POST request for deposit
       * update state
       */
      RequestForDeposit();
    }
  }, [form.getValues("userPaymentMethodId"), form.getValues("amount")]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    /**
     * Submitting Transaction Information after successful deposit request
     */
    const result = await A__POST__WalletDepositTransactionInfoSubmitByCrypto({
      ...data,
      requestId: steps.request.requestId,
    });

    ResponseX({ title: "Deposit: Transaction Information", result });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md space-y-6 bg-white p-4 rounded-lg"
      >
        <InputX
          form={form}
          name="amount"
          label="Deposit Amount"
          type="number"
        />

        <InputX
          form={form}
          name="userPaymentMethodId"
          label="Payment Method"
          type="select"
          options={defaultMethods}
        />

        {steps.request.completed ? (
          <>
            <InputX form={form} name="transactionId" label="Transaction ID" />
            <InputX
              form={form}
              name="transactionSource"
              label="Transaction Source"
            />
          </>
        ) : null}
        {steps.request.completed ? (
          <SubmitX
            pending={form.formState.isSubmitting}
            text="Request deposit"
          />
        ) : null}
      </form>
    </Form>
  );
}
