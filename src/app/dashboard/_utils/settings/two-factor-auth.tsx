"use client";

import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"; // Add this import
import {
  A__POST__TwoFactorActivation,
  A__POST__TwoFactorAuth,
} from "./actions";
import ResponseX from "@/components/molecules/response.x";
import ApiCopy from "../api-keys/api-copy";
import Disable2FAModal from "./disable-2fa-modal";

const TwoFactorAuth = ({ active = false }: { active?: boolean }) => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(active);
  const [verificationCode, setVerificationCode] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeData, setQRCodeData] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [disable2FA, setDisable2FA] = useState(false);

  const handle2FAToggle = async (checked: boolean) => {
    if (!is2FAEnabled) {
      if (checked) {
        setIsLoading(true);
        try {
          const result = await A__POST__TwoFactorAuth();
          if (result.success) {
            setQRCodeData(result.data.qrCode);
            setSecretKey(result.data.key);
            setShowQRCode(true);
          } else {
            ResponseX({ title: "2FA Enabled", result });
          }
        } catch (error) {
          console.error("Failed to fetch 2FA session:", error);
          // Handle error (e.g., show an error message to the user)
        } finally {
          setIsLoading(false);
        }
      } else {
        setShowQRCode(false);
        setQRCodeData("");
        setSecretKey("");
        setDisable2FA(true);
      }
    } else {
      setDisable2FA(true);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await A__POST__TwoFactorActivation({
      secretKey,
      code: verificationCode,
    });
    ResponseX({ title: "2FA Enabled", result });
    if (result.success) {
      setShowQRCode(false);
      setQRCodeData("");
      setSecretKey("");
      setIs2FAEnabled(true);
      setDisable2FA(false);
    }
  };

  return (
    <Fragment>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Enhance your account security with 2FA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="2fa-toggle"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Enable 2FA
            </Label>
            <Switch
              id="2fa-toggle"
              checked={is2FAEnabled}
              onCheckedChange={handle2FAToggle}
              // disabled={active}
            />
          </div>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-[200px] w-[200px] mx-auto" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            showQRCode && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Image
                    src={qrCodeData}
                    alt="QR Code for Google Authenticator"
                    width={200}
                    height={200}
                    className="border rounded-md"
                  />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Scan this QR code with your Google Authenticator app
                </p>
                <div className="text-center space-y-2">
                  <Label>or, With Key (Manual)</Label>
                  <div className="font-mono bg-gray-100 p-2 rounded flex items-center gap-2 justify-center">
                    {secretKey}
                    <ApiCopy apiKey={secretKey} />
                  </div>
                </div>
                <form onSubmit={handleVerificationSubmit} className="space-y-2">
                  <Label htmlFor="verification-code">Verification Code</Label>
                  <Input
                    id="verification-code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                    className="text-center"
                  />
                  <Button type="submit" className="w-full">
                    Verify and Enable 2FA
                  </Button>
                </form>
              </div>
            )
          )}
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Two-factor authentication adds an extra layer of security to your
            account by requiring a code from your phone in addition to your
            password.
          </p>
        </CardFooter>
      </Card>
      {disable2FA && is2FAEnabled ? (
        <Disable2FAModal
          defaultOpen={disable2FA}
          disabler={setDisable2FA}
          setIs2FAEnabled={setIs2FAEnabled}
        />
      ) : null}
    </Fragment>
  );
};

export default TwoFactorAuth;
