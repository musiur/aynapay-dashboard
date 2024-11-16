"use client";

import RefundAccept from "./refund-accept";
import { useSearchParams } from "next/navigation";
import RefundApprove from "./refund-approve";
import { useEffect, useState } from "react";
import { getCookie } from "@/lib/utils";
import RefundSubmitLink from "./refund-submit-link";

const RefundActionBlock = ({ row }: { row: any }) => {
  const params = useSearchParams();
  const tab = params.get("tab");

  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const persistedUid = getCookie("uid");
      setUid(persistedUid);
    }
  }, []);

  const actions: { [key: string]: React.ReactNode } = {
    Hold: <RefundSubmitLink sessionId={row.original?.activeSession} />,
    Pending: <RefundAccept id={row.original?.id} />,
    WaitingForConfirmation:
      uid === row.original.createdBy ? (
        <RefundApprove id={row.original?.id} />
      ) : null,
  };

  const views: { [key: string]: React.ReactNode } = {
    earn: actions[row.original?.status || "Pending"],
    refund: actions[row.original?.status || "Pending"],
  };

  return <>{views[tab || "earn"]}</>;
};

export default RefundActionBlock;
