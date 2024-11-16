"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  T__Schema__PaymentMethods,
  __Schema__PaymentMethods,
} from "./payment-methods.column";
import InputX from "@/components/molecules/input.x";
import { T__SelectOption } from "@/lib/types";
import SubmitX from "@/components/molecules/submit.x";
import ResponseX from "@/components/molecules/response.x";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploaderX from "@/components/molecules/uploader.x";
import { A__PATCH__PaymentMethod, A__POST__PaymentMethod } from "./actions";

const PaymentMethodForm = ({
  defaultValues,
}: {
  defaultValues?: T__Schema__PaymentMethods;
}) => {
  const router = useRouter();
  const form = useForm<T__Schema__PaymentMethods>({
    resolver: zodResolver(__Schema__PaymentMethods),
    defaultValues: defaultValues || Promo__DefaultValues,
  });

  async function onSubmit(data: T__Schema__PaymentMethods) {
    if (defaultValues?.id) {
      data.id = defaultValues.id;
    }

    const formData = new FormData();

    for (let item in data) {
      // @ts-ignore
      formData.append(item, data[item]);
    }

    const result = !defaultValues?.id
      ? await A__POST__PaymentMethod(formData)
      : await A__PATCH__PaymentMethod(formData, defaultValues.id);

    ResponseX({ title: "Payment Method", result });
    if (result.success) {
      router.push("/dashboard/payment-methods");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-4 rounded-lg space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputX name="providerName" form={form} label="Provider Name" />
          <InputX
            name="providerType"
            form={form}
            label="Provider Type"
            options={Options__ProviderType}
            type="select"
          />
          <InputX name="codeName" form={form} label="Code Name" />
          <UploaderX
            form={form}
            name="icon"
            label="Upload Images"
            // @ts-ignore
            defaultValues={form.watch("icon")}
            multiple={false}
            size={3}
          />
          <InputX
            name="receivingChanelNumberOrName"
            form={form}
            label="Receving Chanel Number or Name"
          />
          <InputX
            name="exchangeRate"
            form={form}
            label="Exchange Rate (BDT)"
            type="number"
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <Link href="/dashboard/payment-methods">
            <Button variant="outline" className="items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <SubmitX
            pending={form.formState.isSubmitting}
            text={defaultValues?.id ? "Save changes" : "Add Payment"}
          />
        </div>
      </form>
    </Form>
  );
};

export default PaymentMethodForm;

const Promo__DefaultValues: T__Schema__PaymentMethods = {
  providerName: "",
  providerType: "MFS",
  codeName: "",
  // icon: [],
  receivingChanelNumberOrName: "",
  exchangeRate: 0,
};

const Options__ProviderType: T__SelectOption[] = [
  {
    label: "MFS",
    value: "MFS",
  },
  {
    label: "BANK",
    value: "BANK",
  },
  {
    label: "Card",
    value: "CARD",
  },
  {
    label: "Crypto",
    value: "CRYPTO",
  },
  {
    label: "Others",
    value: "OTHERS",
  },
];
