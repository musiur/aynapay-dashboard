"use client";

import { useState } from "react";
import ResponseX from "@/components/molecules/response.x";
import SubmitX from "@/components/molecules/submit.x";
import { A__POST__TransactionConfirmer } from "./actions";

const TransactionConfirmer = ({
  id,
  type,
  transactionType,
  providerType,
}: {
  id: string;
  type?: string;
  transactionType: string;
  providerType: string;
}) => {
  const [pending, setPending] = useState(false);
  const handleAccept = async () => {
    setPending(true);
    const endpoint =
      transactionType === "Deposit"
        ? providerType === "CRYPTO"
          ? "/wallet/confirm-deposit/"
          : "/wallet/confirm-deposit-by-others/"
        : "/payment/confirm-transaction/";

    const result = await A__POST__TransactionConfirmer(id, endpoint);

    ResponseX({
      title: `${type === "DEPOSIT" ? "Deposit" : "Payment"} Confirmation`,
      result,
    });
    setPending(false);
  };
  return <SubmitX text="Accept" pending={pending} action={handleAccept} />;
};

export default TransactionConfirmer;
