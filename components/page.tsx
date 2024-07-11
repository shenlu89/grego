"use client";
import { useEffect, useState } from "react";
import pool from "@/data/writing-pool.json";

export default function Home() {
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState(new Set());
  const [mode, setMode] = useState(1);
  const [lastSelectedTime, setLastSelectedTime] = useState(null);
  const [lastSelectedTopic, setLastSelectedTopic] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const storedTopics = localStorage.getItem("selectedTopics");
      const storedMode = localStorage.getItem("mode");
      const storedLastSelectedTime = localStorage.getItem("lastSelectedTime");
      const storedLastSelectedTopic = localStorage.getItem("lastSelectedTopic");
      const storedTopicsData = localStorage.getItem("topicsData");

      if (storedTopics) {
        setSelectedTopics(new Set(JSON.parse(storedTopics)));
      }
      if (storedMode) {
        setMode(parseInt(storedMode, 10));
      }
      if (storedLastSelectedTime) {
        setLastSelectedTime(new Date(storedLastSelectedTime));
      }
      if (storedLastSelectedTopic) {
        setLastSelectedTopic(JSON.parse(storedLastSelectedTopic));
      }
      if (storedTopicsData) {
        setTopics(JSON.parse(storedTopicsData));
      }

      selectRandomTopic();
    }

    fetchData();
  }, []);

  const goToTopic = (id) => {
    // router.push(`/topic/${id}`);
  };

  const selectRandomTopic = () => {
    if (mode === 1) {
      if (selectedTopics.size === topics.length) {
        setSelectedTopics(new Set());
      }

      const availableTopics = topics.filter(
        (topic) => !selectedTopics.has(topic.id)
      );
      setCurrentTopic(
        availableTopics[Math.floor(Math.random() * availableTopics.length)]
      );
    } else {
      setLastSelectedTime(new Date());
      setLastSelectedTopic(currentTopic);
      setCurrentTopic(topics[Math.floor(Math.random() * topics.length)]);
    }

    localStorage.setItem("selectedTopics", JSON.stringify([...selectedTopics]));
    localStorage.setItem("mode", mode);
    if (lastSelectedTime) {
      localStorage.setItem("lastSelectedTime", lastSelectedTime.toISOString());
    }
    if (lastSelectedTopic) {
      localStorage.setItem(
        "lastSelectedTopic",
        JSON.stringify(lastSelectedTopic)
      );
    }
    localStorage.setItem("topicsData", JSON.stringify(topics));
  };

  const confirmSelection = () => {
    if (currentTopic && !selectedTopics.has(currentTopic.id)) {
      const newSelectedTopics = new Set(selectedTopics);
      newSelectedTopics.add(currentTopic.id);
      setSelectedTopics(newSelectedTopics);
      const newTopics = topics.map((topic) =>
        topic.id === currentTopic.id
          ? { ...currentTopic, lastSelectedTime: new Date() }
          : topic
      );
      setTopics(newTopics);
      localStorage.setItem(
        "selectedTopics",
        JSON.stringify([...newSelectedTopics])
      );
      localStorage.setItem("topicsData", JSON.stringify(newTopics));
    }
  };

  const resetSelection = () => {
    setSelectedTopics(new Set());
    setCurrentTopic(null);
    setLastSelectedTime(null);
    setLastSelectedTopic(null);
    setTopics(topics.map((topic) => ({ ...topic, lastSelectedTime: null })));

    localStorage.removeItem("selectedTopics");
    localStorage.removeItem("mode");
    localStorage.removeItem("lastSelectedTime");
    localStorage.removeItem("lastSelectedTopic");
    localStorage.removeItem("topicsData");
  };

  const sortedSelectedTopics = [...selectedTopics]
    .map((id) => topics.find((topic) => topic.id === id))
    .sort(
      (a, b) => new Date(a.lastSelectedTime) - new Date(b.lastSelectedTime)
    );

  return (
    <div className="container">
      <div className="topic-card" id="topic-card">
        {currentTopic && (
          <>
            <h2>Topic {currentTopic.id}</h2>
            <p>
              <strong>Topic:</strong> {currentTopic.topic}
            </p>
            <p>
              <strong>Translation:</strong> {currentTopic.translation}
            </p>
          </>
        )}
      </div>
      <div className="buttons">
        <button onClick={selectRandomTopic}>Select Random Topic</button>
        <button onClick={confirmSelection}>Confirm Selection</button>
        <button
          onClick={() => {
            const newMode = mode === 1 ? 2 : 1;
            setMode(newMode);
            localStorage.setItem("mode", newMode);
          }}
        >
          Switch to {mode === 1 ? "Mode 2" : "Mode 1"}
        </button>
        <button onClick={resetSelection}>Reset</button>
      </div>
      {mode === 2 && lastSelectedTime && lastSelectedTopic && (
        <div>
          <p>
            Last selected topic was {lastSelectedTopic.topic} at{" "}
            {lastSelectedTime.toLocaleString()}
          </p>
        </div>
      )}
      <div className="topics-list">
        <h3>Selected Topics:</h3>
        <ul>
          {sortedSelectedTopics.map((topic) => (
            <li key={topic.id}>
              <button onClick={() => goToTopic(topic.id)}>
                <p>
                  <strong>{topic.topic}</strong>
                </p>
                <p>
                  Selected on:{" "}
                  {new Date(topic.lastSelectedTime).toLocaleString()}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="topics-list">
        <h3>Available Topics:</h3>
        <ul>
          {topics
            .filter((topic) => !selectedTopics.has(topic.id))
            .map((topic) => (
              <li key={topic.id}>
                <p>
                  <strong>{topic.topic}</strong>
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
