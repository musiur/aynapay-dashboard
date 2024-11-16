"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SubmitX from "@/components/molecules/submit.x";
import InputX from "@/components/molecules/input.x";
import ResponseX from "@/components/molecules/response.x";
import { A__POST__SupportTicket } from "./actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const FormSchema = z.object({
  title: z.string().min(1),
  message: z.string().min(1),
});

const CreateSupport = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await A__POST__SupportTicket(data);
    
    ResponseX({ title: "Create Support", result });
    router.push("/dashboard/support");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[380px] mx-auto space-y-6 p-4 bg-white rounded-lg shadow-sm"
      >
        <InputX form={form} name="title" label="Issue" />
        <InputX
          form={form}
          name="message"
          label="Message"
          placeholder="Write your message here"
          type="textarea"
        />

        <div className="space-y-2">
          <SubmitX
            pending={form.formState.isSubmitting}
            className="w-full"
            text="Create Support"
          />
          <div>
            <Link href="/dashboard/support">
              <Button variant="outline" className="w-full">
                Back to Supports
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateSupport;
