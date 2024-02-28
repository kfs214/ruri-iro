import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { questions } from '@/const';

type QuestionAnswerPair = {
  questionValue: string;
  answer: string;
};

type ShownPair = {
  questionLabel: string;
  answer: string;
};

export type UpdateQuestionAnswerPair = (args: {
  newPair: QuestionAnswerPair;
  index: number;
}) => void;

type PersonalPerspectiveState = {
  questionAnswerPairs: QuestionAnswerPair[];
  updateQuestionAnswerPair: UpdateQuestionAnswerPair;
  getShownPairs: () => ShownPair[];
};

export const usePersonalPerspectiveStore = create<PersonalPerspectiveState>()(
  devtools(
    persist(
      (set, get) => ({
        questionAnswerPairs: [
          { questionValue: 'kinokoOrTakenoko', answer: '' },
          { questionValue: 'futureDreams', answer: '' },
          { questionValue: 'lifeChangingMoment', answer: '' },
        ],
        updateQuestionAnswerPair: ({ newPair, index }) => {
          const { questionAnswerPairs } = get();
          const newPairs = [...questionAnswerPairs];
          newPairs[index] = newPair;

          set({ questionAnswerPairs: newPairs });
        },
        getShownPairs: () => {
          const { questionAnswerPairs } = get();
          return questionAnswerPairs
            .filter(({ answer }) => answer)
            .map(({ questionValue, answer }) => {
              const { label } =
                questions.find(({ value }) => value === questionValue) ?? {};
              if (!label) return null;

              return { questionLabel: label, answer };
            })
            .filter((e) => e) as ShownPair[];
        },
      }),
      {
        name: 'personal-perspective-storage',
        skipHydration: true,
      },
    ),
    { name: 'PersonalPerspectiveStore' },
  ),
);
