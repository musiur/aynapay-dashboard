"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SubmitX from "@/components/molecules/submit.x";
// import InputX from "@/components/molecules/input.x";
// import ResponseX from "@/components/molecules/response.x";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
import { A__POST__SupportTicketReply } from "./actions";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import Resolved from "./resolved";
import { Fragment } from "react";
const FormSchema = z.object({
  message: z.string().min(1),
});
const Reply = ({ ticketId, status }: { ticketId: string; status: string }) => {
  // const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await A__POST__SupportTicketReply({ ...data, ticketId });

    form.reset();
  }
  return (
    <div className="border-t p-4 space-y-4">
      {status === "CLOSED" ? (
        <div className="text-center text-sm text-gray-400">
          This issue is closed!
        </div>
      ) : (
        <Fragment>
          <Form {...form}>
            <form
              className="w-full flex items-center space-x-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <Input
                {...form.register("message")}
                className="inline-flex w-full"
              />
              <SubmitX
                pending={form.formState.isSubmitting}
                icon={<SendIcon className="w-4 h-4" />}
                variant="outline"
              />
            </form>
          </Form>

          <Resolved id={ticketId} text={true} />
        </Fragment>
      )}
    </div>
  );
};

export default Reply;
