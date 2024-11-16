"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputX from "@/components/molecules/input.x";
import { T__SelectOption } from "@/lib/types";
import SubmitX from "@/components/molecules/submit.x";
import { z } from "zod";
import { A__PATCH__CustomerStatus } from "./action";
import ResponseX from "@/components/molecules/response.x";

const __Schema__CustomersStatus = z.object({
  account: z.object({
    uid: z.string(),
    status: z.string(),
    role: z.string()
  }),
  wallet: z.object({
    walletId: z.string(),
    status: z.string(),
  }),

});

export type T__Schema__CustomersStatus = z.infer<
  typeof __Schema__CustomersStatus
>;

const PatchWalletStatus = ({
  defaultValues,
  roleEditable = false
}: {
    defaultValues?: T__Schema__CustomersStatus;
    roleEditable: boolean;
}) => {
  const form = useForm<T__Schema__CustomersStatus>({
    resolver: zodResolver(__Schema__CustomersStatus),
    defaultValues: defaultValues,
  });

  async function onSubmit(data: T__Schema__CustomersStatus) {
    const result = await A__PATCH__CustomerStatus(data);

    ResponseX({ title: "Customer Data Update", result });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full bg-white p-4 rounded-lg space-y-4"
      >
        <InputX
          name="account.status"
          form={form}
          label="Account Status"
          options={Options__AccountStatus}
          type="select"
        />
        <InputX
          name="wallet.status"
          form={form}
          label="Wallet Status"
          options={Options__WalletStatus}
          type="select"
        />
        <InputX
          name="account.role"
          form={form}
          label="Role"
          options={Options__Role}
          type="select"
          disabled={!roleEditable}
        />
        <SubmitX pending={form.formState.isSubmitting} text={"Save changes"} />
      </form>
    </Form>
  );
};

export default PatchWalletStatus;

const Options__AccountStatus: T__SelectOption[] = [
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Blocked",
    value: "BLOCKED",
  },
  {
    label: "Verified",
    value: "VERIFIED",
  },
];
const Options__WalletStatus: T__SelectOption[] = [
  {
    label: "Inactive",
    value: "INACTIVE",
  },
  {
    label: "Active",
    value: "ACTIVE",
  },
];

const Options__Role: T__SelectOption[] = [
  // {
  //   label: "Admin",
  //   value: "ADMIN",
  // },
  {
    label: "Receiver",
    value: "RECEIVER",
  },
  {
    label: "Moderator",
    value: "MODERATOR",
  },
  {
    label: "Platform",
    value: "PLATFORM",
  },
];
