import { Card, CardContent, CardHeader } from "@/components/ui/card";
import clsx from "clsx";
import {
  ActivityIcon,
  Clock,
  CoinsIcon,
  DollarSign,
  DotSquare,
  LockIcon,
  PercentCircle,
  PercentCircleIcon,
  PercentDiamond,
  Wallet2Icon,
  WalletIcon,
} from "lucide-react";

const BalanceCard = ({
  data,
  commission,
  role,
}: {
  data: any;
  commission: any;
  role: string;
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      <Card className="w-full max-w-md shadow-none">
        <CardHeader className="flex flex-row items-center gap-2">
          <WalletIcon className="w-6 h-6 text-muted-foreground" />
          <div className="text-md md:text-xl font-semibold">
            Wallet Balance (BDT)
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CoinsIcon className="w-5 h-5 text-muted-foreground" />
              <div className="text-muted-foreground">Balance</div>
            </div>
            <div className="text-2xl font-bold">
              {data?.balance?.toFixed(2)}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LockIcon className="w-5 h-5 text-muted-foreground" />
              <div className="text-muted-foreground">On Hold</div>
            </div>
            <div className="text-2xl font-bold">
              {data?.holdAmount?.toFixed(2)}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ActivityIcon className="w-5 h-5 text-muted-foreground" />
              <div className="text-muted-foreground">Status</div>
            </div>
            <div
              className={clsx("px-2 py-1 rounded-full text-xs font-medium", {
                "bg-green-100 text-green-600": data?.status === "ACTIVE",
                "bg-red-100 text-red-600": data?.status === "INACTIVE",
              })}
            >
              {data?.status}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ActivityIcon className="w-5 h-5 text-muted-foreground" />
              <div className="text-muted-foreground">Secret Key</div>
            </div>
            <div
              className={clsx("px-2 py-1 rounded-full text-xs font-medium", {
                "bg-green-100 text-green-600": data?.isSecretKeyActive === true,
                "bg-red-100 text-red-600": data?.isSecretKeyActive === false,
              })}
            >
              {data?.isSecretKeyActive ? "ACTIVE" : "INACTIVE"}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-md shadow-none">
        <CardHeader className="flex flex-row items-center gap-2">
          <DotSquare className="w-6 h-6 text-muted-foreground" />
          <div className="text-md md:text-xl font-semibold">
            Pending Balance (BDT)
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet2Icon className="w-5 h-5 text-muted-foreground" />
              <div className="text-muted-foreground">Withdrawal Pending</div>
            </div>
            <div className="text-2xl font-bold">
              {data?.withdrawalPendingAmount?.toFixed(2)}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet2Icon className="w-5 h-5 text-muted-foreground" />
              <div className="text-muted-foreground">Refund Pending</div>
            </div>
            <div className="text-2xl font-bold">
              {data?.refundPendingAmount?.toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>
      {
        role === "RECEIVER" ? <Card className="w-full max-w-md shadow-none">
          <CardHeader className="flex flex-row items-center gap-2">
            <DotSquare className="w-6 h-6 text-muted-foreground" />
            <div className="text-md md:text-xl font-semibold">
              Earnings (BDT)
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-muted-foreground" />
                <div className="text-muted-foreground">Available in balance</div>
              </div>
              <div className="text-2xl font-bold">
                {data?.earningAvailableBalance?.toFixed(2)}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div className="text-muted-foreground">Lifetime</div>
              </div>
              <div className="text-2xl font-bold">
                {data?.lifetimeEarnedBalance?.toFixed(2)}
              </div>
            </div>
          </CardContent>
        </Card> : null
      }

      {role === "ADMIN" ? null : (
        <Card className="w-full max-w-md shadow-none">
          <CardHeader className="flex flex-row items-center gap-2">
            <PercentCircleIcon className="w-6 h-6 text-muted-foreground" />
            <div className="text-md md:text-xl font-semibold">Fees & Rates</div>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/**
             * gatewayFeesInPercentForPlatform
             * refundProcessFeesInPercentForPlatform
             * commissionRateInPercentForPaymentProcessor
             * commissionRateInPercentForRefundProcessor
             */}
            {role === "PLATFORM" ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PercentDiamond className="w-5 h-5 text-muted-foreground" />
                    <div className="text-muted-foreground">Gateway Fee</div>
                  </div>
                  <div className="text-2xl font-bold">
                    {commission?.gatewayFeesInPercentForPlatform?.toFixed(2)}%
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PercentDiamond className="w-5 h-5 text-muted-foreground" />
                    <div className="text-muted-foreground">Refund Fee</div>
                  </div>
                  <div className="text-2xl font-bold">
                    {commission?.refundProcessFeesInPercentForPlatform?.toFixed(
                      2
                    )}
                    %
                  </div>
                </div>
              </>
            ) : null}
            {role === "RECEIVER" ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PercentCircle className="w-5 h-5 text-muted-foreground" />
                    <div className="text-muted-foreground">
                      Payment Commission
                    </div>
                  </div>
                  <div className="text-2xl font-bold">
                    {commission?.commissionRateInPercentForPaymentProcessor?.toFixed(
                      2
                    )}
                    %
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PercentCircle className="w-5 h-5 text-muted-foreground" />
                    <div className="text-muted-foreground">
                      Refund Commission
                    </div>
                  </div>
                  <div className="text-2xl font-bold">
                    {commission?.commissionRateInPercentForRefundProcessor?.toFixed(
                      2
                    )}
                    %
                  </div>
                </div>
              </>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BalanceCard;
