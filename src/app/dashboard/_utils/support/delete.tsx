"use client"

import ResponseX from "@/components/molecules/response.x";
import { A__DELETE__SupportTicket } from "./actions";
import SubmitX from "@/components/molecules/submit.x";
import { useState } from "react";
import { Trash } from "lucide-react";

const DeleteSupport = ({ id }: { id: string }) => {
  const [pending, setPending] = useState(false);
  const HandleDelete = async () => {
    setPending(true);
    const result = await A__DELETE__SupportTicket(id);
    
    ResponseX({ title: "Delete Support", result });
    setPending(false);
  };
    return <SubmitX pending={pending} action={HandleDelete} variant="outline" icon={<Trash className="w-4 h-4" />} />;
};

export default DeleteSupport;
