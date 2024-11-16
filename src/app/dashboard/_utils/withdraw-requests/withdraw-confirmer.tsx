"use client";

import { useState } from "react";
import { A__POST__WithdrawConfirmer } from "./action";
import ResponseX from "@/components/molecules/response.x";
import SubmitX from "@/components/molecules/submit.x";

const WithdrawConfirmer = ({ id }: { id: string }) => {
  const [pending, setPending] = useState(false);
  const handleAccept = async () => {
    setPending(true);
    const result = await A__POST__WithdrawConfirmer(id);
    ResponseX({ title: "Withdraw Confirmation", result });
    setPending(false);
  };
  return <SubmitX text="Accept" pending={pending} action={handleAccept} />;
};

export default WithdrawConfirmer;
