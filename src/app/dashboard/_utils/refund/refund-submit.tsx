/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import InputX from "@/components/molecules/input.x";
import SubmitX from "@/components/molecules/submit.x";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  A__GET__RefundSessionRetrive,
  A__POST__RefundSubmit,
} from "./_utils/actions";
import ResponseX from "@/components/molecules/response.x";
import { useRouter } from "next/navigation";
import RefundBack from "./_utils/refund-back";
import { useEffect, useState } from "react";
import Image from "next/image";
// import UploaderX from "@/components/molecules/uploader.x";

const __Schema__RefundSubmit = z.object({
  paymentTransactionId: z.string().min(1),
  paymentTransactionSource: z.string().min(1),
  // paymentProofScreenShot: z.string().min(1)
});

export type T__Schema__RefundSubmit = z.infer<typeof __Schema__RefundSubmit>;

const RefundSubmit = ({ sessionId }: { sessionId: string }) => {
  const router = useRouter();
  const [link, setLink] = useState("");
  const [pending, setPending] = useState(false);

  const [bankDetails, setBankDetails] = useState<any>(null);

  const handleRetreiveSessionData = async () => {
    setPending(true);
    const result = await A__GET__RefundSessionRetrive(sessionId);
    
    if (result?.success) {
      const { platformPaymentMethod } = result?.data;
      const retrieveData = {
        number: result?.data?.bankNumberOrAddress,
        image: platformPaymentMethod?.icon,
        name: platformPaymentMethod?.providerName,
        channel: platformPaymentMethod?.receivingChanelNumberOrName,
      };
      setBankDetails(retrieveData);
    }
    setPending(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const from = localStorage.getItem("__from");
      from && setLink(from);
    }
    handleRetreiveSessionData();
  }, []);

  const form = useForm<T__Schema__RefundSubmit>({
    resolver: zodResolver(__Schema__RefundSubmit),
    defaultValues: {
      paymentTransactionId: "",
      paymentTransactionSource: "",
      // paymentProofScreenShot: ""
    },
  });
  const onSubmit = async (data: T__Schema__RefundSubmit) => {
    const result = await A__POST__RefundSubmit(data, sessionId);
    ResponseX({ title: "Refund Transaction Information Submission", result });
    if (result?.success) {
      router.push(link || "/dashboard/refunds?tab=refund");
    }
  };
  return (
    <div className="p-4 md:p-8 max-w-xl space-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 p-4 bg-white rounded-lg"
        >
          <div>
            <h3 className="font-semibold">Submit transaction information</h3>
            <p className="text-xs text-gray-500">
              Please submit the transaction information to proceed with the
              refund. Use the payment method you used to make the payment and
              which is mentioned below here.
            </p>
          </div>
          {!pending ? (
            bankDetails ? (
              <div className="flex items-center gap-4 border rounded-xl p-2">
                <Image
                  src={bankDetails?.image}
                  alt="bank"
                  width={100}
                  height={100}
                  className="w-10 h-10 rounded-lg"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">{bankDetails?.name}</p>
                  <p>{bankDetails?.number}</p>
                </div>
              </div>
            ) : null
          ) : (
            <div>Loading...</div>
          )}
          <hr />
          <InputX
            form={form}
            name="paymentTransactionId"
            label="Payment Transaction ID"
          />
          <InputX
            form={form}
            name="paymentTransactionSource"
            label="Payment Transaction Source"
          />
          {/* <UploaderX
            form={form}
            name="paymentProofScreenShot"
            label="Payment proof screenshot"
            // @ts-ignore
            defaultValues={form.watch("paymentProofScreenShot")}
            multiple={false}
            size={3}
          /> */}
          <div className="flex items-center justify-start gap-4 pt-10">
            <RefundBack />
            <SubmitX
              pending={form.formState.isSubmitting}
              text="Submit Information"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RefundSubmit;
