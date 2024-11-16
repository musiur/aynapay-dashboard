"use client";
import { A__POST__Refund } from "./actions";
import ResponseX from "@/components/molecules/response.x";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SubmitX from "@/components/molecules/submit.x";
import { getCookie } from "@/lib/utils";

const RefundAccept = ({ id }: { id: string }) => {
  const [pending, setPending] = useState(false);
  const [access, setAccess] = useState(false);
  const router = useRouter();
  const handleAcceptance = async () => {
    setPending(true);
    const result = await A__POST__Refund(id);
    ResponseX({ title: "Accept Refund", result });
    if (result?.success) {
      router.push(
        `/dashboard/refund/submit-transaction-information?sessionId=${result?.data?.sessionId}`
      );
    }
    setPending(false);
  };


  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = getCookie("role");
      setAccess(role === "RECEIVER");
    }
  }, []);

  if (!access) return null;
  return <SubmitX pending={pending} action={handleAcceptance} text="Accept" />;
};

export default RefundAccept;
