"use client";

import SubmitX from "@/components/molecules/submit.x";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CheckCheck, Sun } from "lucide-react";
import { useState } from "react";
import { A__PATCH__SupportTicketMarkAsResolved } from "./actions";
import ResponseX from "@/components/molecules/response.x";

const Resolved = ({ text = false, id }: { text?: boolean; id: string }) => {
  const [pending, setPending] = useState(false);
  const handleResolver = async () => {
    setPending(true);
    const result = await A__PATCH__SupportTicketMarkAsResolved(id);
    
    ResponseX({ title: "Mark as resolved", result });
    setPending(false);
  };
  return text ? (
    <SubmitX
      text="Mark as resolved"
      pending={pending}
      action={handleResolver}
    />
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className="w-9 h-9 flex items-center justify-center border rounded-md"
            role="button"
            onClick={() => handleResolver()}
          >
            {pending ? (
              <Sun className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCheck className="w-4 h-4" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Mark as resolved</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Resolved;
