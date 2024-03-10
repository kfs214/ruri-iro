import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type PreviewState = {
  profileSheetBase64Url: string;
  setProfileSheetBase64Url: (url: string) => void;
};

export const usePreviewStore = create<PreviewState>()(
  devtools(
    (set) => ({
      profileSheetBase64Url: '',
      setProfileSheetBase64Url: (url) => {
        set({ profileSheetBase64Url: url });
      },
    }),
    { name: 'PreviewStore' },
  ),
);
