import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type DOBEditing = {
  isCustomDOBEnabled: boolean;
  customDOB: string;
  dayjsDOB: Dayjs | null;
};

export type OverviewState = {
  shownDOB: string;
  occupation: string;
  location: string;
  setIsCustomDOBEnabled: (value: boolean) => void;
  setCustomDOB: (value: string) => void;
  setDayjsDOB: (value: Dayjs | null) => void;
  setOccupation: (value: string) => void;
  setLocation: (value: string) => void;
} & DOBEditing;

function formatDOB({ isCustomDOBEnabled, customDOB, dayjsDOB }: DOBEditing) {
  if (isCustomDOBEnabled && customDOB) {
    return customDOB;
  }

  if (!isCustomDOBEnabled && dayjsDOB) {
    return dayjsDOB.format('YYYY-MM-DD');
  }

  return '';
}

const storage = createJSONStorage<OverviewState>(() => localStorage, {
  reviver: (key, value) => {
    if (key === 'dayjsDOB' && value) {
      return dayjs(value as string);
    }
    return value;
  },
});

export const useOverviewStore = create<OverviewState>()(
  devtools(
    persist(
      (set, get) => ({
        isCustomDOBEnabled: true,
        customDOB: '',
        dayjsDOB: null,
        shownDOB: '',
        occupation: '',
        location: '',
        setIsCustomDOBEnabled: (value) => {
          set({ isCustomDOBEnabled: value });
          const { isCustomDOBEnabled, customDOB, dayjsDOB } = get();
          const shownDOB = formatDOB({
            isCustomDOBEnabled,
            customDOB,
            dayjsDOB,
          });
          set({ shownDOB });
        },
        setCustomDOB: (value) => {
          set({ customDOB: value });
          const { isCustomDOBEnabled, customDOB, dayjsDOB } = get();
          const shownDOB = formatDOB({
            isCustomDOBEnabled,
            customDOB,
            dayjsDOB,
          });
          set({ shownDOB });
        },
        setDayjsDOB: (value) => {
          set({ dayjsDOB: value });
          const { isCustomDOBEnabled, customDOB, dayjsDOB } = get();
          const shownDOB = formatDOB({
            isCustomDOBEnabled,
            customDOB,
            dayjsDOB,
          });
          set({ shownDOB });
        },
        setOccupation: (value) => set({ occupation: value }),
        setLocation: (value) => set({ location: value }),
      }),
      {
        name: 'overview-storage',
        skipHydration: true,
        storage,
      },
    ),
  ),
);
