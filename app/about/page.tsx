import { Metadata } from "next";
import Link from "@/components/custom-link";
import { AboutPage } from "@/data/meta-data";
import { TfiEmail } from "react-icons/tfi";
import GRETable from "@/components/table"
import { tableData } from '@/data/table-data'

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
      <h1 className="flex text-2xl font-extrabold mb-4">FAQs</h1>
      <h2 className="flex text-xl font-extrabold mb-4">What motivated me to build this website?</h2>
      <p className="text-slate-600 mb-4">
        I created this website as a tool to help me prepare for the GRE Analytical Writing section in 2025. As a non-native English speaker, I found writing to be one of my biggest challenges. To improve my writing skills, I developed this site to practice and enhance my performance in the GRE Analytical Writing section. Now that my exam is complete, I share this tool with others who may be facing similar challenges. I hope it helps you practice, improve, and succeed in your GRE writing journey!
      </p>
      <h2 className="flex text-xl font-extrabold mb-4">How does GRE GO classify all the instructions for issues?</h2>
      <p className="text-slate-600 mb-4">
        All the{" "}
        <Link href="https://www.ets.org/gre/test-takers/general-test/prepare/content/analytical-writing/issue.html#accordion-514f0607b1-item-605010d7b3">
          Instruction sets
        </Link>{" "}
        in GRE issues pool.
      </p>
      <GRETable data={tableData} />
      <p className="text-slate-600 mb-4">

      </p>
      <h1 className="flex text-2xl font-extrabold mb-4">Contact</h1>
      <ul className="text-slate-600">
        <li className="flex items-center space-x-2 mb-4" title="Email">
          <TfiEmail className="w-5 h-5" />
          <Link
            href="mailto: shelu89dev@gmail.com"
          >
            shenlu89dev@gmail.com
          </Link>
        </li>
      </ul>
    </div>
  );
}
