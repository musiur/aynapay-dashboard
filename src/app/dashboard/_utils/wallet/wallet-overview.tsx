import { Button } from "@/components/ui/button";
import { A__GET__ProfileInfo } from "../customers/action";
import BalanceCard from "./balance-card";
import Link from "next/link";

const WalletOverview = async () => {
  const userdata = await A__GET__ProfileInfo();
  return (
    <div className="p-4 md:p-8 space-y-8">
      {userdata?.data?.wallet ? (
        <BalanceCard
          data={userdata?.data?.wallet}
          commission={userdata?.data?.developmentInfo}
          role={userdata?.data?.auth?.role}
        />
      ) : null}
      <div className="flex flex-wrap items-center justify-start gap-2">
        <Link href="/deposit">
          <Button>Deposit</Button>
        </Link>
        <Link href={`/dashboard/wallet/withdraw?active=${userdata?.data?.wallet?.isSecretKeyActive}`}>
          <Button variant="outline">Withdraw</Button>
        </Link>
      </div>
    </div>
  );
};
export default WalletOverview;
