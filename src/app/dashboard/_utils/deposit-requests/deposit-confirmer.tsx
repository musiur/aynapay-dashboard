"use client";

import { useState } from "react";
import { A__POST__DepositConfirmer } from "./action";
import ResponseX from "@/components/molecules/response.x";
import SubmitX from "@/components/molecules/submit.x";

const DepositConfirmer = ({ id }: { id: string }) => {
  const [pending, setPending] = useState(false);
  const handleAccept = async () => {
    setPending(true);
    const result = await A__POST__DepositConfirmer(id);
    ResponseX({ title: "Deposit Confirmation", result });
    setPending(false);
  };
  return <SubmitX text="Accept" pending={pending} action={handleAccept} />;
};

export default DepositConfirmer;
