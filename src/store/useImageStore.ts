import { Crop } from 'react-image-crop';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

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

export const useImageStore = create<ImageState>()(
  devtools((set) => ({
    profileImgSrc: '',
    coverImgSrc: '',
    profileImage: '',
    coverImage: '',
    setProfileImgSrc: (newSrc) => {
      set({ profileImgSrc: newSrc });
    },
    setCoverImgSrc: (newSrc) => {
      set({ coverImgSrc: newSrc });
    },
    setProfileCrop: (newCrop) => {
      set({ profileCrop: newCrop });
    },
    setCoverCrop: (newCrop) => {
      set({ coverCrop: newCrop });
    },
    setProfileImage: (newSrc) => {
      set({ profileImage: newSrc });
    },
    setCoverImage: (newSrc) => {
      set({ coverImage: newSrc });
    },
  })),
);
