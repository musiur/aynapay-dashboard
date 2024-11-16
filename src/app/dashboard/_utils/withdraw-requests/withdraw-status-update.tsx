"use client";

import { A__PATCH__WithdrawStatus } from "./action";
import ResponseX from "@/components/molecules/response.x";
import SubmitX from "@/components/molecules/submit.x";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import InputX from "@/components/molecules/input.x";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FormSchema = z.object({
  status: z.string().min(1),
  note: z.string().optional(),
});

export const WithdrawStatusUpdate = ({
  defaultValues,
  backlink = "/",
}: {
  defaultValues: { id: string; status: string };
  backlink?: string;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: defaultValues.status,
      note: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await A__PATCH__WithdrawStatus({
      id: defaultValues.id,
      ...data,
    });

    ResponseX({ title: "Withdraw Status Update", result });
    if (result.success) {
      router.push(backlink);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg mx-auto space-y-6 p-4 bg-white rounded-lg"
      >
        <InputX
          form={form}
          name="status"
          label="Status"
          type="select"
          options={Options___Status}
        />
        <InputX form={form} name="note" label="Note" type="textarea" />
        <div className="flex items-center justify-start  gap-4">
          <Link href={backlink}>
            <Button variant="outline">Back</Button>
          </Link>
          <SubmitX text="Save changes" pending={form.formState.isSubmitting} />
        </div>
      </form>
    </Form>
  );
};

// 'Pending' | 'InProgress' | 'Completed' | 'Failed' | 'Authorized' | 'Cancelled'
const Options___Status = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Completed",
    label: "Completed",
  },
  {
    value: "Failed",
    label: "Failed",
  },
  {
    value: "Cancelled",
    label: "Cancelled",
  },
  {
    value: "InProgress",
    label: "InProgress",
  },
  {
    value: "Authorized",
    label: "Authorized",
  },
];
