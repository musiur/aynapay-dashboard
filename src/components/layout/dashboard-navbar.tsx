"use client";

import { CreditCardIcon } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogoutAction } from "@/app/actions";
import ResponseX from "../molecules/response.x";
import { useEffect, useState } from "react";
import { A__GET__Token } from "@/app/_utils/actions";
import SocketToggler from "./socket-toggler";
import { AddUser } from "../modals/add-user";

const domain = process.env.NEXT_PUBLIC_SOCKET;

const DashboardNavbar = () => {
  const [token, setToken] = useState<any>("");
  const getTokenFromCookie = async () => {
    const result = await A__GET__Token();
    setToken(result);
  };

  useEffect(() => {
    getTokenFromCookie();
  }, []);

  const logout = async () => {
    const result = await LogoutAction();
    ResponseX({ title: "Logout", result });
    if (result.success) {
      window.location.href = `${process.env.NEXT_PUBLIC_FF}/sign-in`;
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 flex h-14 lg:h-[60px] items-center justify-end gap-4 border-b bg-muted backdrop-blur-2xl px-6 rounded-t-2xl">
      <Link className="lg:hidden" href="#">
        <CreditCardIcon className="h-6 w-6" />
        <span className="sr-only">Dashboard</span>
      </Link>
      <div className="flex items-center justify-end gap-5">
        {token && domain ? (
          <SocketToggler token={token} domain={domain} />
        ) : null}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <Link href="/dashboard/settings">
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-pink-600 hover:text-pink-800 hover:bg-pink-200"
              role="button"
              onClick={logout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardNavbar;
