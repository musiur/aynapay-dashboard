"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputX from "@/components/molecules/input.x";
import { T__SelectOption } from "@/lib/types";
import SubmitX from "@/components/molecules/submit.x";
import ResponseX from "@/components/molecules/response.x";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
// import UploaderX from "@/components/molecules/uploader.x";
import { z } from "zod";
import { A__POST__RefundCreate } from "./_utils/actions";
import { useEffect, useState } from "react";

const __Schema__RefundCreate = z.object({
  amount: z.number().min(1),
  paymentMethodId: z.string().min(1),
  refundReason: z.string().min(1),
  accountType: z.enum(["PERSONAL_ACCOUNT"]),
  bankNumberOrAddress: z.string().min(1),
  // paymentProofScreenShot: z.string().min(1),
  callbackUrl: z.string().min(1),
});

export type T__Schema__RefundCreate = z.infer<typeof __Schema__RefundCreate>;

const RefundCreateForm = ({ methods = [] }: { methods?: any[] }) => {
  const router = useRouter();
  const [__from, set__From] = useState<string>(
    "/dashboard/transactions?tab=refund"
  );
  const form = useForm<T__Schema__RefundCreate>({
    resolver: zodResolver(__Schema__RefundCreate),
    defaultValues: {
      amount: 0,
      paymentMethodId: "",
      refundReason: "",
      accountType: "PERSONAL_ACCOUNT",
      bankNumberOrAddress: "",
      // paymentProofScreenShot: ""
      callbackUrl: "",
    },
  });

  async function onSubmit(data: T__Schema__RefundCreate) {
    const result = await A__POST__RefundCreate(data);
    ResponseX({
      title: "Create Refund",
      result,
    });
    if (result.success) {
      router.push(__from);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const from = localStorage.getItem("__from");
      from && set__From(from);
    }
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-4 rounded-lg space-y-4 max-w-[420px]"
      >
        <div className="space-y-8">
          <hr />
          <InputX
            form={form}
            name="amount"
            label="Amount (BDT)"
            type="number"
            minValue={1}
          />
          <InputX
            form={form}
            name="paymentMethodId"
            label="Payment Method"
            type="select"
            options={methods}
          />
          <InputX
            form={form}
            name="callbackUrl"
            label="Callback URL"
            type="text"
          />
          <InputX
            form={form}
            name="refundReason"
            label="Refund Reason"
            type="textarea"
          />
          <InputX
            form={form}
            name="accountType"
            label="Account Type"
            options={Options__AccountType}
            type="select"
          />
          <InputX
            form={form}
            name="bankNumberOrAddress"
            label="Bank number or address"
          />

          {/* <UploaderX
            form={form}
            name="paymentProofScreenShot"
            label="Payment proof screenshot"
            // @ts-ignore
            defaultValues={form.watch("paymentProofScreenShot")}
            multiple={true}
            size={3}
          /> */}
        </div>
        <div className="flex items-center justify-start gap-4 pt-10">
          <Link href={__from}>
            <Button variant="outline" className="items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <SubmitX pending={form.formState.isSubmitting} text="Create Refund" />
        </div>
      </form>
    </Form>
  );
};

export default RefundCreateForm;

const Options__AccountType: T__SelectOption[] = [
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
    label: "Merchant Account",
    value: "MERCHANT_ACCOUNT",
  },
];
