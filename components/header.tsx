"use client";
import type { NextPage } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderNavLinks } from "@/data/meta-data";

const Navbar: NextPage = () => {
  const pathname = usePathname();

  return (
    <header className="flex max-w-6xl container mx-auto select-none md:relative fixed inset-x-0 bottom-0 z-50 md:bg-transparent bg-white">
      <div className="flex justify-between w-full mx-4 py-4 border border-x-0 border-t-0 border-b-slate-200">
        <Link href={"/"} className="flex text-green-500 space-x-1 items-center justify-center">
          <img src="/logo.svg" className="size-8 md:flex hidden" />
          <span className="text-xl font-extrabold tracking-tighter self-center pr-8 md:flex hidden">
            GRE GO
          </span>
        </Link>
        <nav className="flex w-full md:w-auto md:justify-start">
          <ul className="flex items-center w-full md:w-auto justify-between">
            <li className="flex">
              <Link href={"/"} className={`flex md:px-3 px-0 md:py-2 py-0 items-center space-x-2 hover:text-green-500 justify-center outline-none ${pathname === "/" && "text-green-500"}`}>
                <span className="md:hidden flex">Home</span>
              </Link>
            </li>
            {HeaderNavLinks?.map((nav) => (
              <li key={nav?.title} className="flex">
                <Link
                  className={`flex md:px-3 px-0 md:py-2 py-0 items-center space-x-2 hover:text-green-500 justify-center outline-none ${pathname?.includes(nav?.title.toLowerCase()) &&
                    "text-green-500"
                    }`}
                  href={nav?.href}
                >
                  <span>{nav?.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
