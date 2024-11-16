import { AfterLoginDashboardTab } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactElement } from "react";

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const token = cookies().get("token");

  if (token) {
    redirect(AfterLoginDashboardTab);
  }
  return <div>{children}</div>;
};

export default PublicRoute;
