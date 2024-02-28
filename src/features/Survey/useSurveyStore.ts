import { RefObject } from 'react';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type SurveyState = {
  surveyRef?: RefObject<HTMLParagraphElement>;
  setSurveyRef: (surveyRef?: RefObject<HTMLParagraphElement>) => void;
};

export const useSurveyStore = create<SurveyState>()(
  devtools(
    (set) => ({
      setSurveyRef: (surveyRef) => {
        set({ surveyRef });
      },
    }),
    { name: 'SurveyStore' },
  ),
);
