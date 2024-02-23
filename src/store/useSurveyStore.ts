import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type SurveyState = {
  scrollSurveyIntoView?: () => void;
  setScrollSurveyIntoView: (scrollSurveyIntoView?: () => void) => void;
};

export const useSurveyStore = create<SurveyState>()(
  devtools((set) => ({
    setScrollSurveyIntoView: (scrollSurveyIntoView) => {
      set({ scrollSurveyIntoView });
    },
  })),
);
