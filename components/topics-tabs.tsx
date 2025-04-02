import { Tab, TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";
import Link from "next/link";
import { HiStar, HiOutlineStar } from "react-icons/hi";

export default function TopicsTabs({ incompletedTopics, completedTopics }: any) {
  return (
    <TabGroup>
      <TabList className="flex space-x-4 mb-4">
        <Tab className={({ selected }) => `px-3 py-2 outline-none ${selected ? 'border-b-2 border-green-500 font-bold' : 'text-gray-500'}`}>Incomplete Topics ({incompletedTopics.length})</Tab>
        <Tab className={({ selected }) => `px-3 py-2 outline-none ${selected ? 'border-b-2 border-green-500 font-bold' : 'text-gray-500'}`}>Completed Topics ({completedTopics.length})</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ul className="flex flex-col space-y-4">
            {incompletedTopics.map((topic: any) => (
              <li key={topic.id}>
                <Link href={`/topics/${topic.id}`} className="flex flex-col p-4 space-y-4 bg-white border">
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
          <ul className="flex flex-col space-y-4 p-4">
            {completedTopics.map((topic: any) => (
              <li key={topic.id}>
                <Link href={`/topics/${topic.id}`} className="flex flex-col p-4 space-y-4 border bg-green-50">
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
