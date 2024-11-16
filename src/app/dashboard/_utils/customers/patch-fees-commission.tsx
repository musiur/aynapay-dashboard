"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputX from "@/components/molecules/input.x";
import SubmitX from "@/components/molecules/submit.x";
import { z } from "zod";
import { A__PATCH__FeesCommission } from "./action";
import ResponseX from "@/components/molecules/response.x";
import { Fragment } from "react";

const __Schema__FeesCommission = z.object({
  userId: z.string(),
  gatewayFeesInPercentForPlatform: z.number().optional(),
  refundProcessFeesInPercentForPlatform: z.number().optional(),
  commissionRateInPercentForPaymentProcessor: z.number().optional(),
  commissionRateInPercentForRefundProcessor: z.number().optional(),
});

export type T__Schema__FeesCommission = z.infer<
  typeof __Schema__FeesCommission
>;

const PatchFeesCommission = ({
  defaultValues,
  role,
}: {
  defaultValues?: T__Schema__FeesCommission;
  role: "RECEIVER" | "PLATFORM" | "ADMIN" | "MODERATOR";
}) => {
  const form = useForm<T__Schema__FeesCommission>({
    resolver: zodResolver(__Schema__FeesCommission),
    defaultValues: defaultValues,
  });

  async function onSubmit(data: T__Schema__FeesCommission) {
    const result = await A__PATCH__FeesCommission(data);

    ResponseX({ title: "Customer Data Update", result });
  }

  return role === "MODERATOR" ? null : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full bg-white p-4 rounded-lg space-y-4"
      >
        {role === "PLATFORM" ? (
          <Fragment>
            <InputX
              name="gatewayFeesInPercentForPlatform"
              form={form}
              label="Gateway Fees (%)"
              type="number"
            />
            <InputX
              name="refundProcessFeesInPercentForPlatform"
              form={form}
              label="Refund Process Fees (%)"
              type="number"
            />
          </Fragment>
        ) : null}
        {role === "RECEIVER" ? (
          <Fragment>
            <InputX
              name="commissionRateInPercentForPaymentProcessor"
              form={form}
              label="Commission Rate for Payment (%)"
              type="number"
            />
            <InputX
              name="commissionRateInPercentForRefundProcessor"
              form={form}
              label="Commission Rate for Refund (%)"
              type="number"
            />
          </Fragment>
        ) : null}
        <SubmitX pending={form.formState.isSubmitting} text={"Save changes"} />
      </form>
    </Form>
  );
};

export default PatchFeesCommission;
