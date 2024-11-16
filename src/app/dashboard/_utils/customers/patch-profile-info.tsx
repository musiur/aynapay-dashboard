"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import InputX from "@/components/molecules/input.x";
import SubmitX from "@/components/molecules/submit.x";
import { A__PATCH__ProfileInfo } from "./action";
import ResponseX from "@/components/molecules/response.x";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  contactNumber: z.string().optional(),
  // profilePicture: z.string().optional().or(z.instanceof(File).optional()),
});

export type T__Schema__ProfileInfo = z.infer<typeof FormSchema>;

const PatchProfileInfo = ({
  defaultValues,
}: {
  defaultValues: T__Schema__ProfileInfo;
}) => {
  const form = useForm<T__Schema__ProfileInfo>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  async function onSubmit(data: T__Schema__ProfileInfo) {
    
    const result = await A__PATCH__ProfileInfo({
      ...data,
      id: defaultValues?.id,
    });

    ResponseX({ title: "Profile updated", result });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Info</CardTitle>
        <CardDescription>Update your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <InputX form={form} name="name" label="Name" />
            {/* <UploaderX
          form={form}
          name="icon"
          label="Upload Profile Picture"
          // @ts-ignore
          defaultValues={form.watch("profilePicture")}
          multiple={false}
          size={3}
        /> */}
            <InputX form={form} name="contactNumber" label="Contact Number" />

            <SubmitX
              pending={form.formState.isSubmitting}
              text="Save Changes"
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PatchProfileInfo;
