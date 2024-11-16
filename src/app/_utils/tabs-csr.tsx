"use client";

import { Tabs } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";

const TabsCSR = ({ children }: { children: ReactNode }) => {
    const params = useSearchParams();
  return (
    <Tabs defaultValue={params.get("tab") || "transactions"}>{children}</Tabs>
  );
};

export default TabsCSR;
