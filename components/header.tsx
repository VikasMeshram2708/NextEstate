import { Building2, Menu } from "lucide-react";
import { buttonVariants } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";

export default function Header() {
  interface NavLink {
    href: string;
    label: string;
  }

  const navLinks: NavLink[] = [
    {
      label: "For Buyers",
      href: "/buy",
    },
    {
      label: "For Rent",
      href: "/rent",
    },
    {
      label: "For Sell",
      href: "/sell",
    },
  ];

  return (
    <header className="w-full p-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="flex items-center gap-x-2">
          <Building2 className="size-8" color="#64748b" />
          <span className="text-gray-600 tracking-wider text-xl sm:text-3xl font-semibold text-shadow-lg">
            NextEstate
          </span>
        </h1>
        {/* Desktop */}
        <div className="md:flex items-center gap-4 hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wider"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop */}
        <div className="tracking-wider md:flex items-center gap-3 hidden">
          <Link href="/login" className={buttonVariants({ variant: "link" })}>
            Login
          </Link>
          <Link
            href="/register"
            className={buttonVariants({ variant: "default" })}
          >
            Register
          </Link>
        </div>

        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent className="">
            <SheetHeader>
              <h1 className="flex items-center gap-x-2">
                <Building2 className="size-8" color="#1d4ed8" />
                <span className="text-xl sm:text-2xl text-shadow-sm font-semibold">
                  NextEstate
                </span>
              </h1>
            </SheetHeader>
            <div className="p-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base tracking-wider"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <SheetFooter>
              <div className="flex flex-col tracking-wider gap-3">
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={buttonVariants({ variant: "default" })}
                >
                  Register
                </Link>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
