import { Tab, TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";
import Link from "next/link";
import { HiStar, HiOutlineStar } from "react-icons/hi";

export default function TopicsTabs({ incompletedTopics, completedTopics }: any) {
  return (
    <TabGroup>
      <TabList className="flex space-x-4 mb-4">
        <Tab className={({ selected }) => `px-3 py-2 outline-none ${selected && 'bg-slate-200  font-bold'} w-full border border-slate-400`}>Incomplete Topics ({incompletedTopics.length})</Tab>
        <Tab className={({ selected }) => `px-3 py-2 outline-none ${selected && 'bg-slate-200 font-bold'} w-full border border-slate-400`}>Completed Topics ({completedTopics.length})</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ul className="flex flex-col space-y-4">
            {incompletedTopics.map((topic: any) => (
              <li key={topic.id}>
                <Link href={`/topics/${topic.id}`} className="flex flex-col p-4 space-y-4 bg-white border border-slate-200">
                  <div className="flex justify-between">
                    <div>#{topic.id}</div>
                    {topic?.starred ? <HiStar className="size-6 fill-yellow-500" /> : <HiOutlineStar className="size-6" />}
                  </div>
                  <div className="font-bold">{topic.topic}</div>
                </Link>
              </li>
            ))}
          </ul>
        </TabPanel>
        <TabPanel>
          <ul className="flex flex-col space-y-4">
            {completedTopics.map((topic: any) => (
              <li key={topic.id}>
                <Link href={`/topics/${topic.id}`} className="flex flex-col p-4 space-y-4 border border-slate-200 bg-green-50">
                  <div className="flex justify-between">
                    <div>#{topic.id}</div>
                    {topic?.starred ? <HiStar className="size-6 fill-yellow-500" /> : <HiOutlineStar className="size-6" />}
                  </div>
                  <div className="font-bold">{topic.topic}</div>
                  <div className="flex justify-between text-slate-600">
                    <span>
                      Words: {topic.content.split(/\s+/).filter((word: string) => word.length > 0).length}
                    </span>
                    <span>{topic.lastdate}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
