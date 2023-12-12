import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type Tag = {
  tag: string;
  tagId: string;
};

export type TagState = {
  tags: Tag[];
  setTags: (newTags: Tag[]) => void;
};

export const useTagStore = create<TagState>()(
  devtools((set) => ({
    tags: [],
    setTags: (newTags) => set({ tags: newTags }),
  })),
);
