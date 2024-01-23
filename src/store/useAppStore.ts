import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// TODO Featureに閉じる状態を分離するか検討
// TODO UI Stateでは？

type AppState = {
  showPreview: boolean;
  formScrollPosition: number;
  setShowPreview: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
  setFormScrollPosition: (scrollY: number) => void;
};

export const useAppStore = create<AppState>()(
  devtools((set) => ({
    showPreview: false,
    formScrollPosition: 0,
    setShowPreview: (e, checked) => {
      set({
        showPreview: checked,
      });
    },
    setFormScrollPosition: (scrollY) => {
      set({ formScrollPosition: scrollY });
    },
  })),
);
