import Link from "next/link";
import { __Schema__Customers, T__Schema__Customers } from "./customers.column";
import PatchWalletStatus from "./patch-wallet-status";
import { Button } from "@/components/ui/button";
import PatchFeesCommission from "./patch-fees-commission";
import PatchProfileInfo from "./patch-profile-info";
import { User } from "lucide-react";
import { Fragment } from "react";

const CustomerDataUpdateForm = async ({
  defaultValues,
  backlink = "/dashboard/customers",
  hideBacklink = false,
  from,
  roleEditable = false,
}: {
  defaultValues: T__Schema__Customers;
  backlink?: string;
  hideBacklink?: boolean;
  from?: string;
  roleEditable?: boolean;
}) => {
  return (
    <div className="space-y-8 max-w-[800px] mx-auto">
      {!hideBacklink ? (
        <div>
          <Link href={backlink}>
            <Button variant="outline">Back</Button>
          </Link>
        </div>
      ) : null}
      <div className="flex flex-col md:grid grid-cols-2 gap-4">
        <div className="col-span-2 bg-white rounded-lg">
          {from === "settings" || roleEditable ? (
            <Fragment>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Balance (BDT)</h3>
                <ul>
                  <li>Available: {defaultValues?.wallet?.balance?.toFixed(2)}</li>
                  <li>Hold Amount: {defaultValues?.wallet?.holdAmount?.toFixed(2)}</li>
                  <li>Refund Amount: {defaultValues?.wallet?.refundPendingAmount?.toFixed(2)}</li>
                  <li>Withdrawal Pending Amount: {defaultValues?.wallet?.withdrawalPendingAmount?.toFixed(2)}</li>
                  <li>Earning in Current Balance: {defaultValues?.wallet?.earningAvailableBalance?.toFixed(2)}</li>
                  <li>Lifetime earnings: {defaultValues?.wallet?.lifetimeEarnedBalance?.toFixed(2)}</li>
                </ul>

              </div>
              <PatchProfileInfo
                defaultValues={{
                  id: defaultValues?.id || "",
                  name: defaultValues?.name || "N/A",
                  contactNumber: defaultValues?.contactNumber || "N/A",
                  // profilePicture: defaultValues?.profilePicture || "",
                }}
              />

            </Fragment>
          ) : (
            <div className="space-y-2">
              <User className="w-[40px] h-[40px]" />
              <p>Name: {defaultValues?.name || "N/A"}</p>
              <p>Contact: {defaultValues?.contactNumber || "N/A"}</p>
              <p>Email: {defaultValues?.auth?.email || "N/A"}</p>
            </div>
          )}
        </div>
        {from !== "settings" ? (
          <>
            <PatchWalletStatus
              defaultValues={{
                account: {
                  uid: defaultValues?.id || "",
                  status: defaultValues?.auth?.status || "",
                  role: defaultValues?.auth?.role || "",
                },
                wallet: {
                  walletId: defaultValues?.wallet?.id || "",
                  status: defaultValues?.wallet?.status || "",
                },
              }}
              roleEditable={roleEditable}
            />
            <PatchFeesCommission
              defaultValues={{
                userId: defaultValues?.id || "",
                gatewayFeesInPercentForPlatform: defaultValues?.developmentInfo?.gatewayFeesInPercentForPlatform,
                refundProcessFeesInPercentForPlatform: defaultValues?.developmentInfo?.refundProcessFeesInPercentForPlatform,
                commissionRateInPercentForPaymentProcessor: defaultValues?.developmentInfo?.commissionRateInPercentForPaymentProcessor,
                commissionRateInPercentForRefundProcessor: defaultValues?.developmentInfo?.commissionRateInPercentForRefundProcessor,
              }}
              role={defaultValues?.auth?.role as "RECEIVER" | "PLATFORM" | "ADMIN" | "MODERATOR"}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CustomerDataUpdateForm;
