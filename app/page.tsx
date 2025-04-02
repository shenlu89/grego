"use client";
import { useEffect } from "react";
import { Checkbox } from "@headlessui/react";
import { HiCheck } from "react-icons/hi";
import { LuShuffle } from "react-icons/lu";
import pool from "@/data/writing-pool.json";
import Link from "next/link";
import useStore from "@/lib/use-store";
import { LuSquarePen } from "react-icons/lu";
import { HiOutlineStar, HiStar } from "react-icons/hi2";
import TopicsTabs from "@/components/topics-tabs"

const randomTopic = (pool: any[]) =>
  pool[Math.floor(Math.random() * pool.length)];

export default function Home() {
  const {
    selectedTopic,
    setSelectedTopic,
    completedTopics,
    incompletedTopics,
    enabled,
    setEnabled,
    starred,
    setStarred,
  }: any = useStore();

  useEffect(() => {
    setSelectedTopic(randomTopic(enabled ? incompletedTopics.filter((topic: any) => topic.starred === starred) : pool.filter((topic: any) => topic.starred === starred)));
  }, [enabled, starred, incompletedTopics, setSelectedTopic]);

  return (
    <>
      <div className="flex flex-col w-full space-y-4">
        <div className="flex md:flex-row flex-col md:space-y-0 space-y-4 w-full justify-between font-bold items-center">
          <div className="flex space-x-4 w-full md:w-auto justify-between md:justify-start">
            <div className="flex space-x-2 items-center flex-nowrap">
              <Checkbox
                checked={enabled}
                onChange={setEnabled}
                className="group size-6 cursor-pointer bg-slate-100 p-1 ring-1 ring-slate-400 data-[checked]:ring-green-500 ring-inset data-[checked]:bg-green-100"
              >
                <HiCheck className="hidden size-4 fill-green-500 group-data-[checked]:block" />
              </Checkbox>
              <span className="whitespace-nowrap">ONLY Incomplete Topics</span>
            </div>
            <button className="flex space-x-2 items-center flex-nowrap" onClick={() => setStarred(!starred)}>
              {starred ? <HiStar className="size-6 fill-yellow-500" /> : <HiOutlineStar className="size-6" />}
              <span className="whitespace-nowrap">Starred</span>
            </button>
          </div>
          <button
            onClick={() =>
              setSelectedTopic(randomTopic(enabled ? incompletedTopics.filter((topic: any) => topic.starred === starred) : pool.filter((topic: any) => topic.starred === starred)))
            }
            className="flex md:w-auto w-full items-center rounded select-none space-x-1 text-sm min-w-fit justify-center font-bold px-3 py-2 border text-green-500 border-green-500 hover:bg-green-500 bg-green-100 hover:text-white"
          >
            <span>PICK ONE TOPIC</span>
            <LuShuffle className="size-5" />
          </button>
        </div>
        <div className="flex flex-col p-4 border bg-white space-y-4">
          <div className="text-lg font-bold">
            {selectedTopic?.topic
              ?.split("\n\n")
              .map((p: any, index: number) => (
                <div key={index}>{p}</div>
              ))}
          </div>
          <hr />
          <div>{selectedTopic?.statements}</div>
          <hr />
          <div className="flex justify-between items-center">
            <div>#{selectedTopic?.id}</div>
            <div className="flex items-center space-x-2 justify-between">
              <div
                className="flex items-center"
              >
                {selectedTopic?.starred ? <HiStar className="size-6 fill-yellow-500" /> : <HiOutlineStar className="size-6" />}
              </div>
              <Link
                href={`/topics/${selectedTopic?.id}`}
                className="flex items-center rounded-full select-none space-x-1 text-sm w-fit justify-center font-bold px-3 py-2 border text-green-500 border-green-500 bg-white hover:text-white hover:bg-green-500 "
              >
                <span>Go to Write</span>
                <LuSquarePen className="size-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="md:flex justify-between space-x-4 hidden">
          <div className="flex flex-col w-1/2 items-center">
            <h2 className="text-xl font-bold mb-4">
              Incomplete Topics ({incompletedTopics.length})
            </h2>
            <ul className="flex flex-col space-y-4">
              {incompletedTopics.map((topic: any) => (
                <li key={topic.id}>
                  <Link
                    href={`/topics/${topic.id}`}
                    className="flex flex-col p-4 space-y-4 bg-white border "
                  >
                    <div className="flex justify-between">
                      <div>#{topic.id}</div>
                      {topic?.starred ? <HiStar className="size-6 fill-yellow-500" /> : <HiOutlineStar className="size-6" />}
                    </div>
                    <div className="font-bold">{topic.topic}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col w-1/2 items-center">
            <h2 className="text-xl font-bold mb-4">
              Completed Topics ({completedTopics.length})
            </h2>
            <ul className="flex flex-col space-y-4">
              {completedTopics.map((topic: any) => (
                <li key={topic.id}>
                  <Link
                    href={`/topics/${topic.id}`}
                    className="flex flex-col p-4 space-y-4 border bg-green-50"
                  >
                    <div className="flex justify-between">
                      <div>#{topic.id}</div>
                      {topic?.starred ? <HiStar className="size-6 fill-yellow-500" /> : <HiOutlineStar className="size-6" />}
                    </div>
                    <div className="font-bold">{topic.topic}</div>
                    <div className="flex justify-between text-slate-600">
                      <span>
                        Words:{" "}
                        {
                          topic.content
                            .split(/\s+/)
                            .filter((word: string) => word.length > 0).length
                        }
                      </span>
                      <span>{topic.lastdate}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-between space-x-4 md:hidden">
          <TopicsTabs incompletedTopics={incompletedTopics} completedTopics={completedTopics} />
        </div>
      </div>
    </>
  );
}
