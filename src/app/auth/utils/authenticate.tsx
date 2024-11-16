/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AfterLoginDashboardTab } from "@/lib/utils";
import { Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Authentication = ({
  data,
}: {
  data: { token: string; role: string; uid: string };
}) => {
  const router = useRouter();
  const { token, role, uid } = data;
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCookie("uid", uid);
      setCookie("role", role);
      setCookie("token", token);
      router.push(AfterLoginDashboardTab);
    }
  }, [window]);
  return (
    <div className="p-4 rounded-lg flex items-center justify-center gap-2">
      <Sun className="animate-spin w-4 h-4" />
      Authenticating
    </div>
  );
};

export default Authentication;

function setCookie(cname: string, cvalue: any) {
  const d = new Date();
  d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
