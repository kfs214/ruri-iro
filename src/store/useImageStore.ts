import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ImageState = {
  profileImage: string;
  coverImage: string;
  setProfileImage: (newSrc: string) => void;
  setCoverImage: (newSrc: string) => void;
};

export const useImageStore = create<ImageState>()(
  devtools((set) => ({
    profileImage: '',
    coverImage: '',
    setProfileImage: (newSrc) => {
      set({ profileImage: newSrc });
    },
    setCoverImage: (newSrc) => {
      set({ coverImage: newSrc });
    },
  })),
);
