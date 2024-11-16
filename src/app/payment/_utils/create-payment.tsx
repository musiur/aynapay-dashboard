"use client";

import { z } from "zod";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import BrandLogo from "@/components/assets/brand";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputX from "@/components/molecules/input.x";
import ResponseX from "@/components/molecules/response.x";
import { A__POST__PaymentCreate } from "./actions";
import { useRouter } from "next/navigation";
import SubmitX from "@/components/molecules/submit.x";

// "amount": 100,
//     "description": "Payment for services",
//     "paymentMethodId": "667c6a8ba2e6248b11a37b61",
//     "note": "Optional note"
const FormSchema = z.object({
  amount: z.number().min(1),
  description: z.string().min(1),
  paymentMethodId: z.string().optional(),
  // note: z.string().optional(),
});

const CreatePayment = ({
  defaultMethods,
  apiKey,
}: {
  defaultMethods: any;
  apiKey: string;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // amount: ,
      description: "",
      paymentMethodId: "",
      // note: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await A__POST__PaymentCreate({
      ...data,
      apiKey,
    });

    ResponseX({ title: "Payment Transaction Information", result });
    if (result.success) {
      router.push(`/payment/transaction?requestId=${result?.data?.id}`);
    }
  }
  return (
    <div className="section grid grid-cols-1 gap-4 min-h-screen bg-primary p-4 text-white">
      <div className="max-w-[440px] mx-auto text-center mb-4">
        <div className="bg-white rounded-lg md:rounded-2xl p-6 md:p-12 text-black">
          <div className="pb-8 space-y-4">
            <BrandLogo className="max-w-[140px] h-auto mx-auto" />
            <div className="mb-4 text-md md:text-xl font-semibold">
              Please make payment with following inputs
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 text-left pt-8"
            >
              <InputX form={form} name="amount" label="Amount" type="number" />

              <InputX
                form={form}
                name="paymentMethodId"
                label="Payment Method"
                type="select"
                options={defaultMethods || [{ label: "text", value: "text" }]}
              />
              <InputX
                form={form}
                name="description"
                label="Description"
                type="textarea"
              />
              {/* <InputX form={form} name="note" label="Note" type="textarea" /> */}

              <div className="col-span-2 pt-8 flex items-center justify-center">
                <SubmitX
                  pending={form.formState.isSubmitting}
                  text="Submit"
                  className="w-full"
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreatePayment;
