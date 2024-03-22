import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type OverviewState = {
  DOB: string;
  occupation: string;
  location: string;
  setDOB: (value: string) => void;
  setOccupation: (value: string) => void;
  setLocation: (value: string) => void;
};

export const useOverviewStore = create<OverviewState>()(
  devtools(
    persist(
      (set) => ({
        DOB: '',
        occupation: '',
        location: '',
        setDOB: (value) => set({ DOB: value }),
        setOccupation: (value) => set({ occupation: value }),
        setLocation: (value) => set({ location: value }),
      }),
      {
        name: 'overview-storage',
        skipHydration: true,
      },
    ),
    { name: 'OverviewStore' },
  ),
);
