"use client";

import { useSidebarOpenContext } from "@/context/sidenav";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarLink = ({ data }: { data: any }) => {
  const { text, link, icon, status } = data;
  const { sidebarOpen, setSidebarOpen } = useSidebarOpenContext();
  const pathname = usePathname();
  return (
    <Link href={link}>
      <div
        className={clsx(
          "flex items-center gap-3 rounded-lg px-3 py-2 [&>svg]:min-h-4 [&>svg]:min-w-4 [&>svg]:max-h-4 [&>svg]:max-w-4 border ring-0 transition ease-in-out duration-2000 outline-none",
          {
            "hover:bg-primary/10 bg-muted border-primary/10 shadow-sm":
              pathname.includes(link),
            "hover:bg-gray-100 border-white shadow-none":
              !pathname.includes(link),
            "opacity-40": status === "todo",
            "opacity-90 animate-pulse": status === "development",
            "opacity-100": status === "production",
          }
        )}
        role="button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {icon}
        <span>{text}</span>
        {/* <span
          className={clsx("w-2 h-2 rounded-full inline-block text-white/0", {
            "bg-pink-600": status === "todo",
            "bg-yellow-600 animate-pulse": status === "development",
            "bg-green-600": status === "production",
          })}
        >
          .
        </span> */}
      </div>
    </Link>
  );
};

export default SideBarLink;
