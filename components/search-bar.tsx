import { FormEvent, useRef, useCallback, useEffect } from "react";
import { HiMagnifyingGlass, HiXCircle } from "react-icons/hi2";
import { BsXCircleFill } from "react-icons/bs";

import { usePathname, useRouter } from "next/navigation";
import useKeyPress from "@/hooks/use-key-press";

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  searchParams,
}: any) {
  const searchInput = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = useCallback(
    (queryParams: { name: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams as any);
      queryParams.map((param) => {
        if (!param.value) {
          params.delete(param.name);
        } else {
          params.set(param.name, param.value);
        }
      });
      return params.toString();
    },
    [searchParams]
  );

  // handle what happens on key press
  const handleKeyPress = useCallback((event: any) => {
    event.preventDefault();
    searchInput.current?.focus();
  }, []);

  const clearSearch = (event: FormEvent) => {
    event.preventDefault();
    setSearchQuery("");
    searchInput.current?.focus();
    router.push(`${pathname}?${createQueryString([{ name: "q", value: "" }])}`);
  };

  useKeyPress(["/"], handleKeyPress);
  useKeyPress(["Escape"], clearSearch);

  useEffect(() => {
    setSearchQuery(searchParams ? searchParams["q"] : "");
  }, [searchParams, setSearchQuery]);

  return (
    <div className="flex relative w-96 items-center">
      <input
        ref={searchInput}
        value={decodeURI(searchQuery || "")}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="pl-10 pr-5 py-2 border border-slate-200 focus:border-slate-400 focus:ring-0 flex-1 bg-slate-100 focus:bg-slate-200 rounded focus:outline-none placeholder:text-slate-400"
        placeholder='Type "/" to search remote jobs'
      />
      <HiMagnifyingGlass className="absolute text-slate-500 top-1/2 transform translate-y-[-50%] left-3 size-5 md:size-5" />
      <BsXCircleFill
        onClick={clearSearch}
        className={`${
          searchQuery || "hidden"
        } absolute top-1/2 transform translate-y-[-50%] right-3 md:size-5 size-5 text-slate-500 cursor-pointer hover:text-slate-900`}
      />
    </div>
  );
}
