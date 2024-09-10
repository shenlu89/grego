"use client";
import { FormEvent, useCallback, useRef, useState } from "react";
import { LuPenSquare } from "react-icons/lu";
import Link from "next/link";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { BsXCircleFill } from "react-icons/bs";
import useKeyPress from "@/hooks/use-key-press";
import useStore from "@/lib/use-store";

export default function Topics() {
  const { incompletedTopics, completedTopics }: any = useStore();
  const [serachPosts, setserachPosts] = useState<string>("");
  const searchInput = useRef<HTMLInputElement>(null);
  const filteredTopics = [...incompletedTopics, ...completedTopics]
    .filter((topic: any) =>
      topic.topic.toLowerCase().includes(serachPosts.toLowerCase())
    )
    .sort((a, b) => a.id - b.id);

  // handle what happens on key press
  const handleKeyPress = useCallback((event: any) => {
    event.preventDefault();
    searchInput.current?.focus();
  }, []);

  const clearSearch = useCallback((event: FormEvent) => {
    event.preventDefault();
    searchInput.current?.focus();
  }, []);

  useKeyPress(["/"], handleKeyPress);
  useKeyPress(["Escape"], clearSearch);
  return (
    <>
      <div className="relative w-full bg-white mb-4">
        <HiMiniMagnifyingGlass className="flex left-3 top-1/2 translate-y-[-50%] absolute w-5 h-5 text-slate-400" />
        <BsXCircleFill
          onClick={() => {
            setserachPosts("");
          }}
          className={`${!serachPosts && "hidden"
            } flex right-3 top-1/2 translate-y-[-50%] absolute w-5 h-5 text-slate-400 hover:text-black cursor-pointer`}
        />
        <input
          ref={searchInput}
          aria-label={`Type "/" to search all topics`}
          type="text"
          onChange={(e) => setserachPosts(e.target.value)}
          placeholder={`Type "/" to search all topics`}
          value={serachPosts}
          className="w-full px-10 py-2 text-black bg-white focus:bg-slate-0 dark:border-black dark:focus:border-black border rounded focus:outline-0"
        />
      </div>
      <ul className="flex flex-col space-y-4">
        {filteredTopics.map((topic) => (
          <li
            key={topic.id}
            className={`flex flex-col p-4 border space-y-4 w-full ${completedTopics.find((t: any) => t.id === topic.id)
                ? "bg-green-50"
                : "bg-white"
              }`}
          >
            <div className="text-lg font-bold">
              {topic?.topic.split("\n\n").map((p: string, index: number) => (
                <h2 key={index}>{p}</h2>
              ))}
            </div>
            <hr />
            <p>{topic?.statements}</p>
            <hr />
            <div className="flex items-center justify-between">
              <span>#{topic.id}</span>
              <Link
                href={`/topics/${topic.id}`}
                className="flex items-center rounded-full select-none space-x-1 text-sm w-fit justify-center font-bold px-3 py-2 border text-green-500 border-green-500 bg-white hover:text-white hover:bg-green-500 "
              >
                <span>Go to Write</span>
                <LuPenSquare className="size-5" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
