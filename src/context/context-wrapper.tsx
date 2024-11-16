"use client"

import { ReactElement } from "react";
import { SidebarOpenContext } from "./sidenav";

const ContextWrapper = ({ children }: { children: ReactElement }) => {
  return <SidebarOpenContext>{children}</SidebarOpenContext>;
};

export default ContextWrapper;
