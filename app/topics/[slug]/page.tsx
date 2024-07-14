"use client";
import { useEffect, useState, useRef } from "react";
import { Textarea } from "@headlessui/react";
import CountDownTimer from "@/components/countdown-timer";
import pool from "@/data/writing-pool.json";
import { notFound } from "next/navigation";
import { HiArrowRight } from "react-icons/hi2";
import { GoHistory } from "react-icons/go";
import { MdOutlineSaveAlt } from "react-icons/md";
import LoadingSpinner from "@/components/loading-spinner";
import { SlArrowRight } from "react-icons/sl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useStore from "@/lib/use-store";

export default function WritingBoard({ params }) {
  const { addCompletedTopic, setIncompleteTopics }: any = useStore();

  const selectedTopic = pool.find((topic) => topic.id === +params.slug);
  if (!selectedTopic) notFound();
  const router = useRouter();

  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const handleSave = () => {
    if (text.length > 0) {
      addCompletedTopic({
        ...selectedTopic,
        content: text,
        lastdate: new Date().toLocaleString(),
      });
      console.log(1);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className="flex flex-col w-full space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/topics" className="hover:text-green-500">
              Topics
            </Link>
            <SlArrowRight className="size-4 text-slate-400" />
            <Link href={`/topics/${selectedTopic.id}`}>{selectedTopic.id}</Link>
          </div>
          <button
            onClick={() => router.back()}
            className="flex font-bold text-sm items-center space-x-2 w-fit justify-center rounded border border-slate-600 bg-slate-100 px-3 py-2 text-slate-600 hover:text-white hover:bg-slate-600 "
          >
            <span>Go Back</span>
            <HiArrowRight className="size-4" />
          </button>
        </div>
        <div className="flex flex-col p-4 border bg-white space-y-4">
          <div className="text-lg font-bold">
            {selectedTopic?.topic.split("\n\n").map((p, index) => (
              <h2 key={index}>{p}</h2>
            ))}
          </div>
          <hr />
          <p>{selectedTopic?.statements}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <div className="flex space-x-1">
            <span>Words:</span>
            <span>
              {text.split(/\s+/).filter((word) => word.length > 0).length}
            </span>
          </div>
          <CountDownTimer />
        </div>
        <Textarea
          ref={textareaRef}
          className="w-full p-4 h-96 outline-none border"
          rows={3}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex w-full justify-between">
          <button className="flex font-bold text-sm items-center space-x-2 w-fit justify-center rounded border border-slate-600 bg-slate-100 px-3 py-2 text-slate-600 hover:text-white hover:bg-slate-600 ">
            <span>History</span>
            <GoHistory className="size-5" />
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-2 text-sm items-center border border-green-500 flex space-x-2 hover:bg-green-500 hover:text-white bg-green-100 rounded text-green-500 font-bold"
          >
            <span>Save</span>
            <MdOutlineSaveAlt className="size-5" />
          </button>
        </div>
      </div>
      <hr />
    </>
  );
}
