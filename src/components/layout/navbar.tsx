import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";

const links = [
  {
    id: 1,
    text: "Home",
    link: "/",
  },
  {
    id: 2,
    text: "Feature",
    link: "/",
  },
  {
    id: 3,
    text: "Pricing",
    link: "/",
  },
  {
    id: 4,
    text: "About",
    link: "/",
  },
  {
    id: 5,
    text: "Contact",
    link: "/",
  },
];

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm dark:bg-gray-950 py-4 md:py-2">
      <div className="container flex items-center justify-between">
        <Link
          className="flex items-center gap-2 text-lg font-semibold"
          href="#"
        >
          <MountainIcon className="h-6 w-6" />
          <span className="font-bold">DigitalZet</span>
        </Link>
        <nav className="hidden items-center gap-0 lg:gap-6 text-sm font-medium md:flex">
          <Links />
        </nav>
        <div className="flex items-center gap-2">
          <Button className="hidden md:inline-flex" variant="outline">
            Sign In
          </Button>
          <Button className="hidden md:inline-flex">Sign Up</Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden" size="icon" variant="ghost">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 p-4">
                <Links />
                <div className="flex flex-col gap-2">
                  <Button variant="outline">Sign In</Button>
                  <Button>Sign Up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const Links = () => {
  return links.map((item: { id: number; text: string; link: string }) => {
    const { id, text, link } = item;
    return (
      <Link
        className="relative inline-block text-gray-900 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-gray-900 before:transition-all before:duration-300 hover:before:w-full hover:text-gray-900 dark:text-gray-50 dark:before:bg-gray-50 dark:hover:text-gray-50 p-2"
        href={link}
        key={id}
      >
        {text}
      </Link>
    );
  });
};

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
