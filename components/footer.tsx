import type { NextPage } from "next";
import Link from "next/link";
import { FaXTwitter, FaGithub } from "react-icons/fa6";

export const Footer: NextPage = () => {
  return (
    <footer className="flex max-w-6xl container mx-auto">
      <div className="flex justify-between w-full mx-4 py-4 border border-x-0 border-b-0 border-t-slate-200">
        <div className="flex items-center bg-slate-50 text-slate-500 w-full justify-between max-w-6xl mx-auto">
          <p>
            {`© ${new Date().getFullYear()} `}
            <Link
              className="hover:text-slate-800 hover:underline underline-offset-2"
              href={"https://shenlu.me"}
              title="Shen Lu"
            >
              Shen Lu
            </Link>
            {`. All the rights reserved.`}
          </p>
          <ul className="flex items-center space-x-2">
            <Link
              href={"https://x.com/shenlu89"}
              target={"_blank"}
              title="X"
            >
              <FaXTwitter className="size-6" />
            </Link>
            <Link
              href={"https://github.com/shenlu89/grego"}
              target={"_blank"}
              title="GitHub"
            >
              <FaGithub className="size-6" />
            </Link>
          </ul>
        </div>
      </div>
    </footer>
  );
};
