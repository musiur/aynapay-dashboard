import {
  CreditCardIcon,
  Currency,
  DollarSignIcon,
  FileText,
  HandCoins,
  Home,
  LucideWallet,
  Settings,
  TicketCheck,
  Users,
  Wallet2,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";
import BrandLogo from "../assets/brand";
import SideBarLink from "./sidebar-link";
import { cookies } from "next/headers";
import SideBarWrapper from "./sidebar.wrapper";

type T__link = {
  id: number;
  text: string;
  link: string;
  icon: ReactElement;
  status: "todo" | "development" | "production";
  access:
    | "ALL"
    | "ADMIN"
    | "RECEIVER"
    | "PLATFORM"
    | "MODERATOR"
    | "RECEIVER_PLATFORM"
    | "ADMIN_MODERATOR"
    | "ADMIN_RECEIVER"
    | "ADMIN_PLATFORM_RECEIVER";
};

const SidebarDashboard = async () => {
  const role = cookies().get("role")?.value || "";
  return (
    <SideBarWrapper>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <BrandLogo className="max-w-[120px] h-auto" />
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {links.map((item: T__link) => {
              return item.access.includes(role.toUpperCase()) ||
                item.access === "ALL" ? (
                <SideBarLink key={item.id} data={item} />
              ) : null;
            })}
          </nav>
        </div>
      </div>
    </SideBarWrapper>
  );
};

export default SidebarDashboard;

const links: T__link[] = [
  // {
  //   id: 1,
  //   text: "Dashboard",
  //   link: "/dashboard/overview",
  //   icon: <Home />,
  //   status: "development",
  //   access: "ALL",
  // },
  {
    id: 2,
    text: "My Wallet",
    link: "/dashboard/wallet",
    icon: <Wallet2 />,
    status: "production",
    access: "ADMIN_PLATFORM_RECEIVER",
  },
  {
    id: 3,
    text: "Deposit",
    link: "/dashboard/deposit-requests",
    icon: <DollarSignIcon />,
    status: "production",
    access: "ADMIN",
  },
  {
    id: 4,
    text: "Withdraw",
    link: "/dashboard/withdraw-requests",
    icon: <Currency />,
    status: "production",
    access: "ADMIN",
  },
  {
    id: 5,
    text: "Transactions",
    link: "/dashboard/transactions?tab=transactions",
    icon: <CreditCardIcon />,
    status: "production",
    access: "ALL",
  },

  {
    id: 6,
    text: "Offers",
    link: "/dashboard/refunds?tab=refund",
    icon: <HandCoins />,
    status: "production",
    access: "RECEIVER",
  },

  {
    id: 7,
    text: "Customers",
    link: "/dashboard/customers",
    icon: <Users />,
    status: "production",
    access: "ADMIN_MODERATOR",
  },
  // {
  //   id: 7,
  //   text: "Blogs",
  //   link: "/dashboard/blogs",
  //   icon: <Text />,
  //   status: "development",
  //   access: "ADMIN",
  // },
  // {
  //   id: 8,
  //   text: "Api Keys",
  //   link: "/dashboard/api-keys",
  //   icon: <Key />,
  //   status: "production",
  //   access: "ALL",
  // },
  // {
  //   id: 9,
  //   text: "Promocodes",
  //   link: "/dashboard/promo-codes",
  //   icon: <Hash />,
  //   status: "production",
  //   access: "ALL",
  // },
  {
    id: 8,
    text: "Payment Methods",
    link: "/dashboard/payment-methods",
    icon: <WalletCards />,
    status: "production",
    access: "ADMIN",
  },
  {
    id: 9,
    text: "Configured Methods",
    link: "/dashboard/configured-payment-methods",
    icon: <LucideWallet />,
    status: "production",
    access: "ADMIN_RECEIVER",
  },
  {
    id: 10,
    text: "Documents",
    link: "/dashboard/documents",
    icon: <FileText />,
    status: "production",
    access: "ALL",
  },
  // {
  //   id: 13,
  //   text: "Notifications",
  //   link: "/dashboard/notifications",
  //   icon: <BellDot />,
  //   status: "development",
  //   access: "ALL",
  // },
  {
    id: 11,
    text: "Support",
    link: "/dashboard/support",
    icon: <TicketCheck />,
    status: "development",
    access: "ALL",
  },

  {
    id: 12,
    text: "Settings",
    link: "/dashboard/settings",
    icon: <Settings />,
    status: "production",
    access: "ALL",
  },
];
