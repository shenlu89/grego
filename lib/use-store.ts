import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import pool from "@/data/writing-pool.json";

const useStore = create(
  persist(
    (set) => ({
      selectedTopic: null,
      completedTopics: [],
      incompletedTopics: pool, // Initialize with an empty array
      setSelectedTopic: (topic) => set({ selectedTopic: topic }),
      addCompletedTopic: (topic) =>
        set((state) => ({
          completedTopics: [
            topic,
            ...state.completedTopics.filter((t) => t.id !== topic.id),
          ],
          incompletedTopics: state.incompletedTopics.filter(
            (t) => t.id !== topic.id
          ),
        })),
      addIncompleteTopic: (topic) =>
        set((state) => ({
          incompletedTopics: [...state.incompletedTopics, topic],
        })),
      setIncompleteTopics: (topics) =>
        set(() => ({
          incompletedTopics: topics,
        })),
    }),
    {
      name: "writing-storage", // unique name for the storage
      storage: createJSONStorage(() => localStorage), // default storage is localStorage
    }
  )
);

export default useStore;
