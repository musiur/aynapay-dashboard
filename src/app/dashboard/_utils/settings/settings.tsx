import ApiKeys from "../api-keys/api-keys";
import { A__GET__ProfileInfo } from "../customers/action";
import PatchProfileInfo from "../customers/patch-profile-info";
import Pin from "./pin";
import ChangePassword from "./change-password";
import TwoFactorAuth from "./two-factor-auth";

const Settings = async () => {
  const result = await A__GET__ProfileInfo();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className={commonClass}>
        {!["ADMIN", "MODERATOR"].includes(result?.data?.auth?.role) ? (
          <PatchProfileInfo
            defaultValues={{
              name: result?.data?.name || "N/A",
              contactNumber: result?.data?.contactNumber || "N/A",
              id: result?.data?.id || "",
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col gap-2 p-4 bg-white rounded-lg">
            <p className="text-lg font-semibold">
              {result?.data?.name || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              {result?.data?.contactNumber || "N/A"}
            </p>
          </div>
        )}

        {result?.data?.auth?.role === "PLATFORM" ? <ApiKeys /> : null}
      </div>
      <div className={commonClass}>
        <TwoFactorAuth active={result?.data?.auth?.isTwoFactorEnabled} />
        <Pin
          isActive={result?.data?.wallet?.isSecretKeyActive || false}
          walletId={result?.data?.wallet?.id || ""}
        />
        <ChangePassword result={result?.data} />
      </div>
    </main>
  );
};

export default Settings;

const commonClass =
  "grid min-[800px]:grid-cols-2 min-[1020px]:grid-cols-1 min-[1160px]:grid-cols-2 min-[1530px]:grid-cols-3 gap-4";
