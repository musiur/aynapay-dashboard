import DashboardNavbar from "@/components/layout/dashboard-navbar";
import PrivateRoute from "@/components/layout/private.route";
import SidebarDashboard from "@/components/layout/sidebar.dashboard";
import { ReactElement } from "react";

const DashboardLayout = ({ children }: { children: ReactElement }) => {
  return (
    <PrivateRoute>
      <div className="flex bg-white flex-row w-full items-start justify-start">
        <SidebarDashboard />

        <div></div>
        <div className="py-0 pr-0 lg:py-4 lg:pr-4 w-full">
          <div className="min-h-[94dvh] flex flex-col w-full bg-muted rounded-2xl">
            <DashboardNavbar />
            {children}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default DashboardLayout;
