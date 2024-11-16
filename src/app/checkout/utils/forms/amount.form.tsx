"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import InputX from "@/components/molecules/input.x";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StepSwitch from "../components/step-switch";
import { CSR__SetCookie } from "../actions";

const FormSchema = z.object({
  description: z.string().optional(),
  agentId: z.string().min(8),
  amount: z.number().min(0),
});

const AmountForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
      agentId: "",
      amount: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    await CSR__SetCookie("checkoutAmount", data);
    router.push("/checkout/methods");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <InputX
          form={form}
          name="description"
          label="Payment Description"
          type="textarea"
        />
        <InputX form={form} name="agentId" label="Agent ID" />
        <InputX
          form={form}
          name="amount"
          label="Payment Amount"
          type="number"
        />
        <StepSwitch />
      </form>
    </Form>
  );
};

export default AmountForm;
