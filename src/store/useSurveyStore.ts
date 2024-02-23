import { RefObject } from 'react';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type SurveyState = {
  surveyRef?: RefObject<HTMLParagraphElement>;
  setRef: (surveyRef?: RefObject<HTMLParagraphElement>) => void;
  scrollSurveyIntoView: () => void;
};

export const useSurveyStore = create<SurveyState>()(
  devtools((set, get) => ({
    setRef: (surveyRef) => {
      set({ surveyRef });
    },
    scrollSurveyIntoView: () => {
      const { surveyRef } = get();

      if (!surveyRef?.current) return;
      surveyRef.current.scrollIntoView({ behavior: 'smooth' });
    },
  })),
);
