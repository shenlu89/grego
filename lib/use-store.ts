import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import pool from "@/data/writing-pool.json";

const useStore = create(
  persist(
    (set) => ({
      enabled: false,
      selectedTopic: null,
      completedTopics: [],
      incompletedTopics: pool, // Initialize with an empty array
      setSelectedTopic: (topic: any) => set({ selectedTopic: topic }),
      addCompletedTopic: (topic: any) =>
        set((state: any) => ({
          completedTopics: [
            topic,
            ...state.completedTopics.filter((t: any) => t.id !== topic.id),
          ],
          incompletedTopics: state.incompletedTopics.filter(
            (t: any) => t.id !== topic.id
          ),
        })),
      setEnabled: (bool: any) => set({ enabled: bool }),
    }),
    {
      name: "writing-storage", // unique name for the storage
      storage: createJSONStorage(() => localStorage), // default storage is localStorage
    }
  )
);

export default useStore;
