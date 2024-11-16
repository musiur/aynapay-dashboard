"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import InputX from "@/components/molecules/input.x";
import SubmitX from "@/components/molecules/submit.x";
import { A__POST__WalletWithdraw } from "./actions";
import ResponseX from "@/components/molecules/response.x";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const FormSchema = z.object({
  amount: z.number().min(1),
  paymentMethodId: z.string().min(1),
  walletSecret: z.string().optional(),
});

const WithdrawForm = ({
  methods = [],
}: {
  methods: any[];
}) => {
  const router = useRouter();

  const params = useSearchParams();
  const active = params.get("active") === "true";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 1,
      paymentMethodId: "",
      walletSecret: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await A__POST__WalletWithdraw(data);

    ResponseX({ title: "Withdraw Request", result });
    if (result?.success) {
      router.push("/dashboard/wallet");
    }
  }


  return (
    <div className="max-w-xl mx-auto p-4 md:p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-ful space-y-4 rounded-lg bg-white border p-4 "
        >
          <InputX form={form} name="amount" label="Amount" type="number" />
          <InputX
            form={form}
            name="paymentMethodId"
            label="Payment Method"
            type="select"
            options={methods}
          />
          {active ? (
            <InputX
              form={form}
              name="walletSecret"
              label="Wallet Secret"
              type="password"
            />
          ) : null}
          <div className="flex flex-wrap items-center justify-start gap-2">
            <SubmitX
              pending={form.formState.isSubmitting}
              text="Make withdraw request"
              variant="outline"
            />
            <Link href="/dashboard/wallet">
              <Button>Cancel</Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WithdrawForm;
