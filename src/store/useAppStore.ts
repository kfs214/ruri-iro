import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type AppState = {
  showPreview: boolean;
  toggleShowPreview: () => void;
};

export const useAppStore = create<AppState>()(
  devtools((set) => ({
    showPreview: false,
    toggleShowPreview: () =>
      set(({ showPreview }) => ({
        showPreview: !showPreview,
      })),
  })),
);
