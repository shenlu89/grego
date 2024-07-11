"use client";
import type { NextPage } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiPlantDuotone } from "react-icons/pi";
import { HeaderNavLinks } from "@/data/meta-data";

const Navbar: NextPage = () => {
  const pathname = usePathname();

  return (
    <header className="flex max-w-6xl container mx-auto select-none md:relative fixed inset-x-0 bottom-0 z-50">
      <div className="flex justify-between w-full mx-4 py-4  border border-x-0 border-t-0 border-b-slate-200">
        <Link href={"/"} className="flex text-green-500 space-x-1 items-center">
          <PiPlantDuotone className="flex size-6" />
          <span className="text-xl font-extrabold tracking-tighter self-center pr-8">
            GREEN
          </span>
        </Link>
        <nav className="flex">
          <ul className="flex items-center">
            {HeaderNavLinks?.map((nav) => (
              <li key={nav?.title}>
                <Link
                  className={`flex px-3 py-2 rounded items-center space-x-2 hover:text-green-500 justify-center outline-none ${
                    pathname?.includes(nav?.title.toLowerCase()) &&
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
