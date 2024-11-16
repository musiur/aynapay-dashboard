"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

const ApiCopy = ({ apiKey }: { apiKey: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (apiKey) {
      navigator.clipboard
        .writeText(apiKey)
        .then(() => {
          setCopied(true);
          // Reset the copied state back to false after 4 seconds
          setTimeout(() => {
            setCopied(false);
          }, 4000);
        })
        .catch((err) => {
          console.error("Failed to copy API key:", err);
        });
    } else {
      console.warn("No API key to copy");
    }
  };

  return (
    <Button size="icon" variant="ghost" onClick={handleCopy}>
      {!copied ? (
        <CopyIcon className="h-4 w-4" />
      ) : (
        <CheckIcon className="h-4 w-4 stroke-green-600" />
      )}
      <span className="sr-only">Copy API key</span>
    </Button>
  );
};

export default ApiCopy;
