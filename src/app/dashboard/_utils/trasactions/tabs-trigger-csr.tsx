/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const TabsTriggerCSR = ({ value, text }: { value: string; text: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("__from", pathname + window?.location?.search);
    }
  }, []);

  return (
    <TabsTrigger
      value={value}
      onClick={() => {
        /**
         * Step 1: Get the current query params
         * Step 2: Remove the "tab" param
         * Step 3: Add the new "tab" param
         * Step 4: Redirect to the new URL
         */

        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set("tab", value);
        const newPathname = `${
          pathname?.split("?")[0]
        }?${queryParams.toString()}`;

        localStorage.setItem("__from", newPathname);

        // redirect to the same url with the new "tab" param
        router.push(`${pathname?.split("?")[0]}?tab=${value}`);
      }}
    >
      {text}
    </TabsTrigger>
  );
};

export default TabsTriggerCSR;
