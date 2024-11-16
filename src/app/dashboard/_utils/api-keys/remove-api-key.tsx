"use client";

import ResponseX from "@/components/molecules/response.x";
import { A__DELETE__RemoveApiKey, A__POST__GenerateApiKey } from "./actions";
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
const RemoveApiKey = () => {
  const [pending, setPending] = useState(false);
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const HandleGenerateApiKey = async () => {
    setPending(true);
    const result = await A__DELETE__RemoveApiKey(password);
    ResponseX({ title: "Revoking API Key", result });
    setPending(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-red-500 border-red-500">Revoke</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Verification</DialogTitle>
          <DialogDescription>
            Please enter your password to revoke your API key.
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
          <Button size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => open && password && HandleGenerateApiKey()}
            variant="destructive"
          >
            {pending ? <Sun className="w-4 h-4 animate-spin" /> : "Revoke"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveApiKey;
