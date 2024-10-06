import { Metadata } from "next";
import Link from "next/link";
import { AboutPage } from "@/data/meta-data";
import { TfiEmail } from "react-icons/tfi";
import Image from "next/image"

export const runtime = "edge";

export const metadata: Metadata = AboutPage.metadata;

export default function About() {
  return (
    <div className="flex flex-col w-full items-start leading-6">
      <h1 className="flex text-2xl font-extrabold mb-4">About</h1>
      <p className="flex text-slate-600 mb-4">
        GRE GO is a toolkit that can help you practice and prepare effectively for the GRE
        Analytical Writing.
      </p>
      {/* <h1 className="flex text-2xl font-extrabold mb-4">Sponsor</h1>
      <p className="flex text-slate-600 mb-4">
        Buy me a coffee if you like it. Thanks for your support!
      </p>
      <div className="flex text-slate-600 border rounded mb-4">
        <Image
          width={120}
          height={120}
          src="/bmc_qr.png"
          alt={""}
          priority
        />
      </div> */}
      <h1 className="flex text-2xl font-extrabold mb-4">Contact</h1>
      <ul className="text-slate-600">
        <li className="flex items-center space-x-2 mb-4" title="Email">
          <TfiEmail className="w-5 h-5" />
          <Link
            href="mailto: shelu89dev@gmail.com"
            className="underline-offset-[3px] hover:underline hover:text-black"
          >
            shelu89dev@gmail.com
          </Link>
        </li>
      </ul>
    </div>
  );
}
