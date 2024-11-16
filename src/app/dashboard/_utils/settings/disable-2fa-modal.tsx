"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { A__POST__TwoFactorDisable } from "./actions";
import ResponseX from "@/components/molecules/response.x";

export default function Disable2FAModal({
  defaultOpen = false,
  disabler,
  setIs2FAEnabled,
}: {
  defaultOpen?: boolean;
  disabler: (value: boolean) => void;
  setIs2FAEnabled: Function;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [code, setCode] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await A__POST__TwoFactorDisable({ code });
      ResponseX({ title: "2FA Disabled", result });
      if (result.success) {
        setOpen(false);
        setIs2FAEnabled(false);
        disabler(false);
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        disabler(value);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Disable Two-Factor Authentication</DialogTitle>
          <DialogDescription>
            Enter your authentication code to disable 2FA. This will reduce the
            security of your account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Code
              </Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Disabling..." : "Disable 2FA"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
