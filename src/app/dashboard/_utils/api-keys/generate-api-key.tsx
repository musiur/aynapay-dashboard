"use client";

import ResponseX from "@/components/molecules/response.x";
import { A__POST__GenerateApiKey } from "./actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sun } from "lucide-react";
import { useState } from "react";
const GenerateApiKey = ({
  label = "Generate",
}: {
  label: "Generate" | "Regenerate";
}) => {
  const [pending, setPending] = useState(false);
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const HandleGenerateApiKey = async () => {
    setPending(true);
    const result = await A__POST__GenerateApiKey(password);
    ResponseX({ title: "Generating API Key", result });
    setPending(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Verification</DialogTitle>
          <DialogDescription>
            Please enter your password to generate your API key for your wallet.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 items-center gap-4">
          <Input
            id="name"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button size="sm" onClick={() => setOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => open && password && HandleGenerateApiKey()}
          >
            {pending ? <Sun className="w-4 h-4 animate-spin" /> : label}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateApiKey;
