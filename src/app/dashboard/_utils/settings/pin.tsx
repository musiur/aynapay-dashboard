"use client";

import { Button } from "@/components/ui/button";
import SubmitX from "@/components/molecules/submit.x";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { useState } from "react";
import {
  A__PATCH__UpdateSecret,
  A__POST__EnableSecret,
  A__POST__RemoveSecret,
} from "./actions";
import { Input } from "@/components/ui/input";
import ResponseX from "@/components/molecules/response.x";
import { Label } from "@/components/ui/label";
import clsx from "clsx";

const Pin = ({
  isActive,
  walletId,
}: {
  isActive: boolean;
  walletId: string;
}) => {
  const [value, setValue] = useState("");
  const [currentPin, setCurrentPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [removePin, setRemovePin] = useState(false);

  const handleSubmit = async () => {
    if (value === confirmPin) {
      setPending(true);
      const result = isActive
        ? await A__PATCH__UpdateSecret({
            currentSecret: currentPin,
            walletId,
            newSecret: value,
          })
        : await A__POST__EnableSecret({
            secret: value,
            walletId,
            currentPassword,
          });

      ResponseX({ title: "Secret setup", result });
      setPending(false);
      setValue("");
      setConfirmPin("");
      setCurrentPassword("");
      setCurrentPin("");
    } else {
      ResponseX({ title: "Secrets do not match", result: { success: false } });
    }
  };

  const handleRemove = async () => {
    if (currentPin === confirmPin) {
      setPending(true);
      const result = await A__POST__RemoveSecret({
        walletId,
        currentSecret: currentPin,
        currentPassword,
      });
      ResponseX({ title: "Secret removed", result });
      setPending(false);
      setRemovePin(false);
      setValue("");
      setCurrentPin("");
      setConfirmPin("");
      setCurrentPassword("");
    } else {
      ResponseX({ title: "Secrets do not match", result: { success: false } });
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-10">
          <div className="w-auto inline-flex items-center justify-start gap-2">
            <CardTitle>
              Wallet Secret
            </CardTitle>
            <span
              className={clsx(
                "px-3 py-1 rounded-full text-center w-auto text-xs",
                {
                  "bg-green-100 text-green-600": isActive,
                  "bg-red-100 text-red-600": !isActive,
                }
              )}
            >
              {isActive ? "ACTIVE" : "INACTIVE"}
            </span>
          </div>
          {isActive && !removePin ? (
            <Button
              variant="outline"
              onClick={() => setRemovePin(true)}
              className="w-auto"
            >
              Deactivate
            </Button>
          ) : null}
        </div>
      </CardHeader>
      <hr className="mb-4" />
      <CardContent>
        <div className="space-y-2">
          {isActive ? (
            <div>
              <Label>Current Secret</Label>
              <Input
                type="password"
                value={currentPin}
                placeholder="6 digit Secret"
                onChange={(e) => setCurrentPin(e.target.value)}
              />
            </div>
          ) : null}
          {!removePin ? (
            <div>
              <Label>{isActive ? "New" : ""} Secret</Label>
              <Input
                type="password"
                value={value}
                placeholder="6 digit Secret"
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          ) : null}
          <div>
            <Label>Confirm Secret</Label>
            <Input
              type="password"
              value={confirmPin}
              placeholder="6 digit Secret"
              onChange={(e) => setConfirmPin(e.target.value)}
            />
          </div>
          <div>
            <Label>Current Password</Label>
            <Input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
        </div>
        <CardFooter className="pt-8 px-0 space-x-2">
          <SubmitX
            pending={pending}
            text={isActive ? (removePin ? "Deactivate" : "Update") : "Enable"}
            action={removePin ? handleRemove : handleSubmit}
            variant={removePin ? "destructive" : "default"}
          />
          {isActive && removePin ? (
            <Button onClick={() => setRemovePin(false)}>
              Cancel
            </Button>
          ) : null}
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default Pin;
