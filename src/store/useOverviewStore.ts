import { ChangeEvent } from 'react';

import { Dayjs } from 'dayjs';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type DOBEditing = {
  isCustomDOBEnabled: boolean;
  customDOB: string;
  dayjsDOB: Dayjs | null;
};

export type OverviewState = {
  shownDOB: string;
  occupation: string;
  location: string;
  handleChangeIsCustomDOBEnabled: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnChangeCustomDOB: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnChangeDayjsDOB: (newValue: Dayjs | null) => void;
  onChangeOccupation: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeLocation: (e: ChangeEvent<HTMLInputElement>) => void;
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

export const useOverviewStore = create<OverviewState>()(
  devtools(
    persist(
      (set, get) => ({
        isCustomDOBEnabled: false,
        customDOB: '',
        dayjsDOB: null,
        shownDOB: '',
        occupation: '',
        location: '',
        handleChangeIsCustomDOBEnabled: (e) => {
          set({ isCustomDOBEnabled: e.target.checked });
          const { isCustomDOBEnabled, customDOB, dayjsDOB } = get();
          const shownDOB = formatDOB({
            isCustomDOBEnabled,
            customDOB,
            dayjsDOB,
          });
          set({ shownDOB });
        },
        handleOnChangeCustomDOB: (e) => {
          set({ customDOB: e.target.value });
          const { isCustomDOBEnabled, customDOB, dayjsDOB } = get();
          const shownDOB = formatDOB({
            isCustomDOBEnabled,
            customDOB,
            dayjsDOB,
          });
          set({ shownDOB });
        },
        handleOnChangeDayjsDOB: (newValue) => {
          set({ dayjsDOB: newValue });
          const { isCustomDOBEnabled, customDOB, dayjsDOB } = get();
          const shownDOB = formatDOB({
            isCustomDOBEnabled,
            customDOB,
            dayjsDOB,
          });
          set({ shownDOB });
        },
        onChangeOccupation: (e) => set({ occupation: e.target.value }),
        onChangeLocation: (e) => set({ location: e.target.value }),
      }),
      {
        name: 'overview-storage',
        skipHydration: true,
      },
    ),
  ),
);
