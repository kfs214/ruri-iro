import { ChangeEvent } from 'react';

import { Dayjs } from 'dayjs';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type OverviewState = {
  isCustomDOBEnabled: boolean;
  handleChangeIsCustomDOBEnabled: (e: ChangeEvent<HTMLInputElement>) => void;
  customDOB: string;
  handleOnChangeCustomDOB: (e: ChangeEvent<HTMLInputElement>) => void;
  dayjsDOB: Dayjs | null;
  handleOnChangeDayjsDOB: (newValue: Dayjs | null) => void;
  occupation?: string;
  onChangeOccupation: (e: ChangeEvent<HTMLInputElement>) => void;
  location?: string;
  onChangeLocation: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useOverviewStore = create<OverviewState>()(
  devtools((set) => ({
    isCustomDOBEnabled: false,
    handleChangeIsCustomDOBEnabled: (e) =>
      set({ isCustomDOBEnabled: e.target.checked }),
    customDOB: '',
    handleOnChangeCustomDOB: (e) => set({ occupation: e.target.value }),
    dayjsDOB: null,
    handleOnChangeDayjsDOB: (newValue) => set({ dayjsDOB: newValue }),
    onChangeOccupation: (e) => set({ occupation: e.target.value }),
    onChangeLocation: (e) => set({ location: e.target.value }),
  })),
);
