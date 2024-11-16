"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { T__Schema__Document, __Schema__Document } from "./document.column";
import InputX from "@/components/molecules/input.x";
import { T__SelectOption } from "@/lib/types";
import SubmitX from "@/components/molecules/submit.x";
import ResponseX from "@/components/molecules/response.x";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { A__PATCH__Document, A__POST__Document } from "./actions";
import UploaderX from "@/components/molecules/uploader.x";

const DocumentForm = ({
  defaultValues,
}: {
  defaultValues?: T__Schema__Document;
}) => {
  const router = useRouter();
  const form = useForm<T__Schema__Document>({
    resolver: zodResolver(__Schema__Document),
    defaultValues: defaultValues || Document__DefaultValues,
  });

  async function onSubmit(data: T__Schema__Document) {
    if (defaultValues?.id) {
      data.id = defaultValues.id;
    }
    const formData = new FormData();

    formData.append("documentType", data.documentType);
    if (data?.status && defaultValues?.status) {
      formData.append("status", data.status);
    }

    data.images.forEach((image, index) => {
      // @ts-ignore
      formData.append("images", image);
    });

    const result = !defaultValues?.id
      ? await A__POST__Document(formData)
      : await A__PATCH__Document(formData, defaultValues.id);

    ResponseX({
      title: `${!defaultValues?.id ? "Add" : "Update"} Document`,
      result,
    });
    if (result.success) {
      router.push("/dashboard/documents");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-4 rounded-lg space-y-4 max-w-[420px] mx-auto"
      >
        <div className="space-y-8">
          <InputX
            name="documentType"
            form={form}
            label="Document Type"
            options={Options__DocumentType}
            type="select"
          />
          {defaultValues?.status ? (
            <InputX
              name="status"
              form={form}
              label="Status"
              options={Options__Status}
              type="select"
            />
          ) : null}
          <UploaderX
            form={form}
            name="images"
            label="Images"
            // @ts-ignore
            defaultValues={form.watch("images")}
            multiple={true}
            size={3}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <Link href="/dashboard/documents">
            <Button variant="outline" className="items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <SubmitX
            pending={form.formState.isSubmitting}
            text={defaultValues?.id ? "Save changes" : "Add Document"}
          />
        </div>
      </form>
    </Form>
  );
};

export default DocumentForm;

const Document__DefaultValues: T__Schema__Document = {
  documentType: "NID",
  images: [],
  status: "PENDING",
};

const Options__Status: T__SelectOption[] = [
  {
    label: "PENDING",
    value: "PENDING",
  },
  {
    label: "ACCEPT",
    value: "ACCEPT",
  },
  {
    label: "REJECT",
    value: "REJECT",
  },
];

const Options__DocumentType: T__SelectOption[] = [
  {
    label: "NID",
    value: "NID",
  },
  {
    label: "Passport",
    value: "PASSPORT",
  },
  {
    label: "Bank Statement",
    value: "BANK_STATEMENT",
  },
  {
    label: "Utitlity Bill",
    value: "UTILITY_BILL",
  },
];
