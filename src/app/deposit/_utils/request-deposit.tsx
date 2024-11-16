"use client";

import { z } from "zod";
import { Form } from "@/components/ui/form";
import BrandLogo from "@/components/assets/brand";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputX from "@/components/molecules/input.x";
import ResponseX from "@/components/molecules/response.x";
import { useRouter } from "next/navigation";
import SubmitX from "@/components/molecules/submit.x";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MethodSelector from "./method-selector";
import { A__POST__ActiveReceivers } from "./actions";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import clsx from "clsx";
import {
  A__POST__WalletDepositRequest,
  A__POST__WalletDepositRequestByOthers,
} from "@/app/dashboard/_utils/wallet/actions";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  amount: z.number().min(1),
  userPaymentMethodId: z.string().optional(),
});

const RequestDeposit = ({
  methods,
  otherMethods,
}: {
  methods: any;
  otherMethods: any;
}) => {
  const router = useRouter();
  const [steps, setSteps] = useState(1);
  const [receiverList, setReceiverList] = useState([]);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState("");
  const [receiverUid, setReceiverUid] = useState("");
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
      userPaymentMethodId: methods[0]?.id,
    },
  });

  const RequestForCryptoDeposit = async () => {
    setPending(true);
    const result = await A__POST__WalletDepositRequest({
      amount: form.getValues("amount"),
      userPaymentMethodId: form.getValues("userPaymentMethodId"),
    });

    if (result.success) {
      // setSteps(2);
      router.push(`/deposit/transaction?requestId=${result?.data?.id}`);
    } else {
      ResponseX({ title: "Deposit Request", result });
    }
    setPending(false);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (steps === 1) {
      const paymentMethodId = data.userPaymentMethodId;
      const filteredMethod: any = [...methods, ...otherMethods].filter(
        (item) => item.id === paymentMethodId
      )[0];

      if (filteredMethod?.providerType === "CRYPTO") {
        // fetch crypto
        RequestForCryptoDeposit();
      } else {
        setSteps(2);
        const response = await A__POST__ActiveReceivers({
          amount: data.amount,
          paymentMethodId: data.userPaymentMethodId,
        });
        // ResponseX({ title: "Receiver list", result: response });
        if (response.success && response.data.length) {
          setReceiverList(
            response?.data?.map((item: any) => {
              const { id, name, profilePicture, userAvailablePaymentMethod } =
                item;
              return {
                id: id,
                name: name,
                image: profilePicture,
                methods: userAvailablePaymentMethod,
              };
            })
          );
        }
      }
    } else if (steps === 2) {
      const payload = {
        amount: data.amount,
        receiverUid,
        userPaymentMethodId: selectedPaymentMethodId,
      };

      const result = await A__POST__WalletDepositRequestByOthers(payload);

      ResponseX({ title: "Deposit Request", result });
      if (result.success) {
        router.push(`/deposit/transaction?requestId=${result?.data?.id}`);
      }
    }
  }

  return (
    <div className="section gap-4 min-h-screen bg-gradient-to-b from-primary/80 to-primary/20 p-4 text-white">
      <div className="max-w-[440px] mx-auto text-center mb-4">
        <div className="bg-white rounded-lg md:rounded-2xl p-6 md:p-12 text-black">
          <div className="pb-8 space-y-4">
            <BrandLogo className="max-w-[140px] h-auto mx-auto" />
            <div className="mb-4 text-sm md:text-base font-semibold">
              Make deposit with following inputs
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 text-left pt-4"
            >
              <InputX
                form={form}
                name="amount"
                label="Amount (BDT)"
                type="number"
              />

              {steps === 1 ? (
                <Tabs defaultValue="crypto" className="w-full">
                  <TabsList>
                    <TabsTrigger value="crypto">Crypto</TabsTrigger>
                    {/* <TabsTrigger value="others">Others</TabsTrigger> */}
                  </TabsList>
                  <TabsContent value="crypto">
                    <MethodSelector
                      defaultValue={form.watch("userPaymentMethodId")}
                      options={methods}
                      handler={(value: string) => {
                        form.setValue("userPaymentMethodId", value);
                      }}
                      amount={form.watch("amount")}
                    />
                  </TabsContent>
                  <TabsContent value="others">
                    <MethodSelector
                      defaultValue={form.watch("userPaymentMethodId")}
                      options={otherMethods.filter(
                        (item: any) => item.providerType !== "CRYPTO"
                      )}
                      handler={(value: string) => {
                        form.setValue("userPaymentMethodId", value);
                      }}
                    />
                  </TabsContent>
                </Tabs>
              ) : null}

              {steps === 2 && receiverList?.length ? (
                <Popover>
                  <PopoverTrigger className="w-full border py-2 rounded-md">
                    {selectedPaymentMethodId ? `Change agent` : "Select agent"}
                  </PopoverTrigger>
                  <PopoverContent className="min-w-[300px] px-0 py-1">
                    <div>
                      {receiverList?.length ? (
                        receiverList?.map((receiver: any) => {
                          const { id, methods, name, image } = receiver;
                          let thisAgentSelected = false;
                          if (
                            methods.filter(
                              (sMethod: any) =>
                                sMethod.paymentMethodId ===
                                selectedPaymentMethodId
                            )?.length
                          ) {
                            thisAgentSelected = true;
                          }
                          return (
                            <div
                              key={id}
                              className={clsx(
                                "flex items-center justify-start gap-4 px-4 py-1",
                                {
                                  "bg-primary text-white rounded-md":
                                    thisAgentSelected,
                                }
                              )}
                            >
                              <div className="relative min-h-10 min-w-10 max-h-10 max-w-10">
                                <Image
                                  src={image || "https://github.com/shadcn.png"}
                                  alt=""
                                  fill
                                  className="object-cover object-center rounded-full"
                                />
                                <div className="h-3 w-3 rounded-full bg-green-400 border-[2px] border-white z-[5] absolute bottom-0 right-0"></div>
                              </div>
                              <div className="w-full">
                                <Accordion type="single" collapsible>
                                  <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                      <span className="font-medium text-[14px]">
                                        {name} ({methods[0]?.providerName})
                                      </span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <p className="text-[12px] pb-1">
                                        Choose account type:
                                      </p>
                                      <div className="grid grid-cols-1 items-center gap-2">
                                        {methods.map((method: any) => {
                                          const {
                                            paymentMethodId,
                                            paymentMethodProfileType,
                                          } = method;
                                          const matched =
                                            paymentMethodId ===
                                            selectedPaymentMethodId;
                                          return (
                                            <PopoverClose
                                              asChild
                                              key={paymentMethodId}
                                            >
                                              <div
                                                className={clsx(
                                                  "capitalize text-[12px] flex items-center justify-start gap-2",
                                                  {
                                                    "font-bold": matched,
                                                  }
                                                )}
                                                role="button"
                                                onClick={() => {
                                                  setSelectedPaymentMethodId(
                                                    paymentMethodId
                                                  );
                                                  setReceiverUid(id);
                                                }}
                                              >
                                                <CheckCircle
                                                  className={clsx("w-4 h-4", {
                                                    "opacity-1": matched,
                                                    "opacity-[0.2]": !matched,
                                                  })}
                                                />
                                                {paymentMethodProfileType
                                                  ?.replaceAll("_", " ")
                                                  ?.replaceAll("ACCOUNT", "")
                                                  ?.toLowerCase()}
                                              </div>
                                            </PopoverClose>
                                          );
                                        })}
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-4 rounded-lg bg-red-200 text-red-600 text-center font-bold">
                          There is no active receiver!
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              ) : null}

              {steps === 2 && !receiverList?.length ? (
                <div className="grid grid-cols-1 gap-2">
                  <div className="my-8 p-4 rounded-lg bg-red-200 text-red-600 text-center">
                    There is no active receiver!
                  </div>
                  <Button onClick={() => setSteps(1)} className="outline">
                    Try again!
                  </Button>
                </div>
              ) : null}

              <div className="col-span-2 pt-8 flex items-center justify-center">
                <SubmitX
                  pending={form.formState.isSubmitting || pending}
                  disabled={form.watch("amount") <= 0}
                  text="Next"
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

export default RequestDeposit;
