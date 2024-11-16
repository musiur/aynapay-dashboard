"use client";

import { useSidebarOpenContext } from "@/context/sidenav";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { Fragment } from "react";

const SideBarWrapper = ({ children }: { children: React.ReactNode }) => {
  const { sidebarOpen, setSidebarOpen } = useSidebarOpenContext();

  return (
    <Fragment>
      <div
        className="opacity-100 lg:opacity-0"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <div
          className="fixed top-0 left-0 w-10 h-10 bg-primary rounded-r-xl flex items-center justify-center mt-2 z-[9999]"
          role="button"
        >
          <Menu
            className={clsx("text-white transition duration-300 ease-in-out", {
              "opacity-0 w-0": sidebarOpen,
              "opacity-100 w-4": !sidebarOpen,
            })}
          />
          <X
            className={clsx("text-white transition duration-300 ease-in-out", {
              "opacity-0 w-0": !sidebarOpen,
              "opacity-100 w-4": sidebarOpen,
            })}
          />
        </div>
      </div>
      <div
        className={clsx(
          "min-h-[100vh] top-0 left-0 bg-white fixed lg:sticky pt-10 lg:pt-auto w-full min-w-auto lg:min-w-[280px] max-w-[280px] transition duration-300 ease-in-out rounded-r-xl lg:rounded-r-none shadow-2xl lg:shadow-none",
          {
            "z-[-1] lg:z-0 opacity-0 lg:opacity-100": !sidebarOpen,
            "z-[999] opacity-100": sidebarOpen,
          }
        )}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default SideBarWrapper;
