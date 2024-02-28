import { get, set, del } from 'idb-keyval';
import { Crop } from 'react-image-crop';
import { create } from 'zustand';
import {
  StateStorage,
  createJSONStorage,
  devtools,
  persist,
} from 'zustand/middleware';

type ImageState = {
  profileImgSrc: string;
  coverImgSrc: string;
  profileCrop?: Crop;
  coverCrop?: Crop;
  profileImage: string;
  coverImage: string;
  setProfileImgSrc: (newSrc: string) => void;
  setCoverImgSrc: (newSrc: string) => void;
  setProfileCrop: (newCrop?: Crop) => void;
  setCoverCrop: (newCrop?: Crop) => void;
  setProfileImage: (newSrc: string) => void;
  setCoverImage: (newSrc: string) => void;
};

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> =>
    (await get(name)) || null,
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

// TODO 保存頻度抑制

export const useImageStore = create<ImageState>()(
  devtools(
    persist(
      (setState) => ({
        profileImgSrc: '',
        coverImgSrc: '',
        profileImage: '',
        coverImage: '',
        setProfileImgSrc: (newSrc) => {
          setState({ profileImgSrc: newSrc });
        },
        setCoverImgSrc: (newSrc) => {
          setState({ coverImgSrc: newSrc });
        },
        setProfileCrop: (newCrop) => {
          setState({ profileCrop: newCrop });
        },
        setCoverCrop: (newCrop) => {
          setState({ coverCrop: newCrop });
        },
        setProfileImage: (newSrc) => {
          setState({ profileImage: newSrc });
        },
        setCoverImage: (newSrc) => {
          setState({ coverImage: newSrc });
        },
      }),
      {
        name: 'image-storage',
        storage: createJSONStorage(() => storage),
        skipHydration: true,
      },
    ),
    { name: 'ImageStore' },
  ),
);
