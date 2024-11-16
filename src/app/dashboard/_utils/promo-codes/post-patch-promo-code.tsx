"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { T__Schema__PromoCode, __Schema__PromoCode } from "./promo.column";
import InputX from "@/components/molecules/input.x";
import { T__SelectOption } from "@/lib/types";
import SubmitX from "@/components/molecules/submit.x";
import ResponseX from "@/components/molecules/response.x";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { A__PATCH__PromoCode, A__POST__PromoCode } from "./actions";

const PromoForm = ({
  defaultValues,
}: {
  defaultValues?: T__Schema__PromoCode;
}) => {
  const router = useRouter();
  if (defaultValues?.expireDate) {
    defaultValues.expireDate = new Date(defaultValues.expireDate);
  }
  const form = useForm<T__Schema__PromoCode>({
    resolver: zodResolver(__Schema__PromoCode),
    defaultValues: defaultValues || Promo__DefaultValues,
  });

  async function onSubmit(data: T__Schema__PromoCode) {
    data.expireDate = new Date(data.expireDate);

    if (defaultValues?.id) {
      data.id = defaultValues.id;
    }

    const result = !defaultValues?.id
      ? await A__POST__PromoCode(data)
      : await A__PATCH__PromoCode(data);

    ResponseX({ title: "Promo Code", result });
    if (result.success) {
      router.push("/dashboard/promo-codes");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-4 rounded-lg space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputX name="couponCode" form={form} label="Coupon code" />
          <InputX
            name="discountType"
            form={form}
            label="Discount Type"
            options={Options__DiscountType}
            type="select"
          />
          <InputX
            name="discountAmount"
            form={form}
            label="Discount Amount"
            type="number"
          />
          <InputX
            name="minOrderAmount"
            form={form}
            label="Min Order Amount"
            type="number"
          />
          <InputX
            name="maxDiscountAmount"
            form={form}
            label="Max Discount Amount"
            type="number"
          />
          <InputX
            name="usageLimit"
            form={form}
            label="Usage Limit"
            type="number"
          />
          <InputX
            name="expireDate"
            form={form}
            label="Expire Date"
            type="date"
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <Link href="/dashboard/promo-codes">
            <Button variant="outline" className="items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <SubmitX
            pending={form.formState.isSubmitting}
            text={defaultValues?.id ? "Save changes" : "Add Coupon"}
          />
        </div>
      </form>
    </Form>
  );
};

export default PromoForm;

const Promo__DefaultValues: T__Schema__PromoCode = {
  couponCode: "",
  discountType: "FIXED",
  discountAmount: 0,
  minOrderAmount: 0,
  maxDiscountAmount: 0,
  usageLimit: 0,
  expireDate: new Date(),
};

const Options__DiscountType: T__SelectOption[] = [
  {
    label: "Fixed",
    value: "FIXED",
  },
  {
    label: "Percentage",
    value: "PERCENTAGE",
  },
];
