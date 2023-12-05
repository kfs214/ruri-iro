import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type AppState = {
  showPreview: boolean;
  setShowPreview: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
};

export const useAppStore = create<AppState>()(
  devtools((set) => ({
    showPreview: false,
    setShowPreview: (e, checked) => {
      set({
        showPreview: checked,
      });
    },
  })),
);
