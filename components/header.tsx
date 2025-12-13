"use client";

import { Building2, Loader2Icon, Menu, UserCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
  const { data, status } = useSession();
  const user = data?.user;

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
        <Link href="/">
          <h1 className="flex items-center gap-x-2">
            <Building2 className="size-8" color="#64748b" />
            <span className="text-gray-600 tracking-wider text-xl sm:text-3xl font-semibold text-shadow-lg">
              NextEstate
            </span>
          </h1>
        </Link>
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
          {status === "loading" ? (
            <Loader2Icon className="animate-spin" />
          ) : status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2">
                <UserCircleIcon />
                <span>{user?.name ?? "Anon"}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button type="button" onClick={() => signOut()}>
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button type="button" onClick={() => signIn("google")}>
              <span>Sign In With Google</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="icon icon-tabler icons-tabler-filled icon-tabler-brand-google"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
              </svg>
            </Button>
          )}
        </div>

        {/* Mobile */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent className="">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-x-2">
                <Building2 className="size-8" color="#1d4ed8" />
                <span className="text-xl sm:text-2xl text-shadow-sm font-semibold">
                  NextEstate
                </span>
              </SheetTitle>
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
                <Button type="button" onClick={() => signIn("google")}>
                  <span>Sign In With Google</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon icon-tabler icons-tabler-filled icon-tabler-brand-google"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
                  </svg>
                </Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
