"use client";
import { FormEvent, useCallback, useRef, useState, useMemo } from "react";
import { LuSquarePen } from "react-icons/lu";
import Link from "next/link";
import { HiCheck, HiChevronDown, HiMiniMagnifyingGlass } from "react-icons/hi2";
import { BsXCircleFill } from "react-icons/bs";
import { HiOutlineStar, HiStar } from "react-icons/hi2";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Checkbox } from "@headlessui/react";
import useKeyPress from "@/hooks/use-key-press";
import useStore from "@/lib/use-store";
import Fuse from "fuse.js";

export default function Topics() {
  const { incompletedTopics, completedTopics, starredTopic }: any = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const searchInput = useRef<HTMLInputElement>(null);
  const [starred, setStarred] = useState(false);

  const allTopics = useMemo(
    () => [...incompletedTopics, ...completedTopics].sort((a, b) => a.id - b.id),
    [incompletedTopics, completedTopics]
  );
  const categories = useMemo(() => ["all", ...Array.from(new Set(allTopics.map((t) => t.category)))].sort((a, b) => a - b), [allTopics]);

  // Fuse.js search options
  const fuse = useMemo(
    () =>
      new Fuse(allTopics, {
        keys: ["topic"],
        threshold: 0.3, // Adjust for strict or fuzzy search
        includeScore: false,
      }),
    [allTopics]
  );

  const filteredTopics = useMemo(() => {
    let topics = searchQuery ? fuse.search(searchQuery).map((result) => result.item) : allTopics;
    topics = !starred ? topics : topics.filter((topic) => topic.starred === true);
    if (selectedCategory !== "all") {
      topics = topics.filter((topic) => topic.category === Number(selectedCategory));
    }
    return topics;
  }, [searchQuery, selectedCategory, fuse, allTopics, starred]);

  // Handle keypresses
  useKeyPress(["/"], (event: any) => {
    event.preventDefault();
    searchInput.current?.focus();
  });

  useKeyPress(["Escape"], (event: any) => {
    event.preventDefault();
    setSearchQuery("");
  });

  return (
    <>
      <div className="flex md:flex-row flex-col w-full justify-center md:space-x-2 fixed md:relative mt-[-1rem] md:mt-0 bg-slate-50 md:bg-transparent p-4 md:p-0">
        <div className="relative w-full bg-white mb-4">
          <HiMiniMagnifyingGlass className="absolute left-3 top-1/2 translate-y-[-50%] w-5 h-5 text-slate-400" />
          <BsXCircleFill
            onClick={() => setSearchQuery("")}
            className={`absolute right-3 top-1/2 translate-y-[-50%] w-5 h-5 text-slate-400 hover:text-black cursor-pointer ${!searchQuery && "hidden"}`}
          />
          <input
            ref={searchInput}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Type "/" to search topics'
            className="w-full px-10 py-2 border border-slate-200 rounded focus:outline-none"
          />
        </div>
        <div className="flex space-x-2 md:flex-1 flex-auto justify-between">
          <div className="relative w-full md:w-52 mb-4">
            <Listbox value={selectedCategory} onChange={setSelectedCategory}>
              <div className="flex relative">
                <ListboxButton className="flex w-full p-2 border border-slate-200 rounded bg-white text-left">
                  <div className="flex w-full text-ellipsis whitespace-nowrap">
                    {selectedCategory === "all" ? `All Instructions (${allTopics.length})` : `Type ${selectedCategory} (${allTopics.filter((topic) => topic.category === Number(selectedCategory)).length})`}
                  </div>
                  <div className="size-6"></div>
                  <HiChevronDown
                    className="absolute text-slate-400 top-1/2 transform translate-y-[-50%] right-3 size-5 "
                    aria-hidden="true"
                  />
                </ListboxButton>
                <ListboxOptions
                  anchor="bottom"
                  className="w-[var(--button-width)] capitalize rounded border border-slate-200 bg-white focus:outline-none mt-1"
                >                {categories.map((category) => (
                  <ListboxOption key={category} value={category} className={`flex group px-3 py-2 justify-between cursor-pointer hover:bg-slate-100 space-x-2 ${selectedCategory === category ? 'bg-green-100' : ''}`}>
                    {category === "all" ? `All Instructions (${allTopics.length})` : `Type ${category} (${allTopics.filter((topic) => topic.category === Number(category)).length})`}
                    <HiCheck className="invisible size-5 text-green-500 group-data-[selected]:visible" />
                  </ListboxOption>
                ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
          <div className="flex relative justify-center item-center mb-4">
            <button className="flex items-center flex-nowrap" onClick={() => setStarred(!starred)}>
              {starred ? <HiStar className="size-6 fill-yellow-500" /> : <HiOutlineStar className="size-6" />}
            </button>
          </div>
        </div>
      </div>
      <hr className="w-full border-t-[1px] border-slate-200 mb-4 md:hidden flex" />
      <ul className="flex w-full flex-col space-y-4 mt-24 md:mt-0">
        {filteredTopics.map((topic) => (
          <li
            key={topic.id}
            className={`flex flex-col p-4 border border-slate-200 space-y-4 w-full ${completedTopics.find((t: any) => t.id === topic.id)
              ? "bg-green-50"
              : "bg-white"
              }`}
          >
            <div className="text-lg font-bold">
              {topic?.topic.split("\n\n").map((p: string, index: number) => (
                <h2 key={index}>{p}</h2>
              ))}
            </div>
            <hr className="border border-slate-200 border-t-transparent" />
            <p>{topic?.statements}</p>
            <hr className="border border-slate-200 border-t-transparent" />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 justify-between">
                <Link href={`#${topic.id}`}>#{topic.id}</Link>
                {/* <button>
                  <FaRegStar className="size-5" />
                </button> */}
              </div>
              <div className="flex items-center space-x-2 justify-between">
                <button
                  className="flex items-center"
                  onClick={() => starredTopic(topic)}
                >
                  {topic?.starred ? <HiStar className="size-6 fill-yellow-500" /> : <HiOutlineStar className="size-6" />}
                </button>
                <Link
                  href={`/topics/${topic.id}`}
                  className="flex items-center rounded-full select-none space-x-1 text-sm w-fit justify-center font-bold px-3 py-2 border text-green-500 border-green-500 bg-white hover:text-white hover:bg-green-500 "
                >
                  <span>Go to Write</span>
                  <LuSquarePen className="size-5" />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
