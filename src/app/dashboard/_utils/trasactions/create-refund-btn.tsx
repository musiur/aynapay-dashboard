"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

const CreateRefundBtn = ({ role }: { role: string }) => {
  const router = useRouter();

  const handleCreateRefund = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "__from",
        "/dashboard/transactions?tab=transactions"
      );
      router.push("/dashboard/refunds/create");
    }
  };
  if (!["PLATFORM"].includes(role.toUpperCase()))
    return null;
  return (
    <Button variant={"outline"} className="gap-2" onClick={handleCreateRefund}>
      Create Refund <ArrowUpRight className="w-4 h-4" />
    </Button>
  );
};

export default CreateRefundBtn;
