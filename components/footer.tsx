import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { FaDiscord, FaXTwitter, FaGithub, FaWeixin } from "react-icons/fa6";

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
              className="flex size-8 justify-center items-center rounded-full border bg-slate-600 hover:bg-black text-white"
              href={"https://x.com/shelu89"}
              target={"_blank"}
              title="X"
            >
              <FaXTwitter className="w-full" />
            </Link>
            <Link
              className="flex size-8 rounded-full justify-center items-center border bg-slate-600 hover:bg-black text-white"
              href={"https://discord.gg/AEXwCWCUSp"}
              target={"_blank"}
              title="Discord"
            >
              <FaDiscord className="w-full" />
            </Link>
            {/* <Link
            className='flex size-8 rounded-full justify-center items-center border bg-slate-600 hover:bg-black text-white'
            href={'https://discord.gg/AEXwCWCUSp'}
            target={'_blank'}
            title='WeChat'
          >
            <FaWeixin className='w-full' />
          </Link> */}
            <Link
              className="flex size-8 rounded-full justify-center items-center border group"
              href={"https://github.com/shenlu89"}
              target={"_blank"}
              title="GitHub"
            >
              <FaGithub className="size-8 fill-slate-600 group-hover:fill-black" />
            </Link>
          </ul>
        </div>
      </div>
    </footer>
  );
};
