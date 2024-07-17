"use client";
import { useEffect, useState } from "react";
import { Checkbox } from "@headlessui/react";
import { HiArrowRight, HiCheck, HiOutlineSwitchVertical } from "react-icons/hi";
import pool from "@/data/writing-pool.json";
import Link from "next/link";
import useStore from "@/lib/use-store";

const randomTopic = (pool: any[]) =>
  pool[Math.floor(Math.random() * pool.length)];

export default function Home() {
  const [enabled, setEnabled] = useState(true);
  const {
    selectedTopic,
    setSelectedTopic,
    completedTopics,
    incompletedTopics,
  }: any = useStore();

  useEffect(() => {
    if (!selectedTopic) {
      setSelectedTopic(randomTopic(enabled ? incompletedTopics : pool));
    }
  }, [selectedTopic, enabled, incompletedTopics, setSelectedTopic]);

  return (
    <>
      <div className="flex flex-col w-full space-y-4">
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
        </div>
        <div className="flex justify-between font-bold items-center">
          <div className="flex space-x-2">
            <Checkbox
              checked={enabled}
              onChange={setEnabled}
              className="group size-6 cursor-pointer bg-slate-100 p-1 ring-1 ring-slate-400 data-[checked]:ring-green-500 ring-inset data-[checked]:bg-green-100"
            >
              <HiCheck className="hidden size-4 fill-green-500 group-data-[checked]:block" />
            </Checkbox>
            <span>ONLY Incomplete Topics</span>
          </div>
          <button
            onClick={() =>
              setSelectedTopic(randomTopic(enabled ? incompletedTopics : pool))
            }
            className="flex items-center rounded-full select-none space-x-1 text-sm w-fit justify-center font-bold px-3 py-2 border text-green-500 border-green-500 bg-white hover:text-white hover:bg-green-500 "
          >
            <span>Pick One Topic</span>
            <HiOutlineSwitchVertical className="size-5" />
          </button>
          <Link
            href={`/topics/${selectedTopic?.id}`}
            className="flex items-center rounded-full select-none space-x-1 text-sm w-fit justify-center font-bold px-3 py-2 border text-green-500 border-green-500 bg-white hover:text-white hover:bg-green-500 "
          >
            <span>Go to Write</span>
            <HiArrowRight className="size-5" />
          </Link>
        </div>
        <hr />
        <div className="flex justify-between space-x-4">
          <div className="flex flex-col w-1/2 items-center">
            <h2 className="text-xl font-bold mb-4">Completed Topics</h2>
            <ul className="flex flex-col space-y-4">
              {completedTopics.map((topic: any) => (
                <li key={topic.id}>
                  <Link
                    href={`/topics/${topic.id}`}
                    className="flex flex-col p-4 space-y-4 border bg-green-50"
                  >
                    <div className="font-normal">{topic.topic}</div>
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
          <div className="flex flex-col w-1/2 items-center">
            <h2 className="text-xl font-bold mb-4">Incomplete Topics</h2>
            <ul className="flex flex-col space-y-4">
              {incompletedTopics.map((topic: any) => (
                <li key={topic.id}>
                  <Link
                    href={`/topics/${topic.id}`}
                    className="flex space-x-1 p-4 bg-white border "
                  >
                    <div>#{topic.id}</div>
                    <div className="font-normal">{topic.topic}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
