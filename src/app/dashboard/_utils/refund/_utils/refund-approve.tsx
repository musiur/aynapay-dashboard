"use client";

import { A__POST__RefundApprove } from "./actions";
import ResponseX from "@/components/molecules/response.x";
import { useState } from "react";
import SubmitX from "@/components/molecules/submit.x";

const RefundApprove = ({ id }: { id: string }) => {
  const [pending, setPending] = useState(false);

  const handleApprove = async () => {
    setPending(true);

    const result = await A__POST__RefundApprove(id);
    ResponseX({ title: "Approve Refund", result });

    setPending(false);
  };

  return <SubmitX action={handleApprove} pending={pending} text="Approve" />;
};

export default RefundApprove;
