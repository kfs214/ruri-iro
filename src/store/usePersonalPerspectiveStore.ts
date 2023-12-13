import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type QuestionAnswerPair = {
  questionValue: string;
  answer: string;
};

export type UpdateQuestionAnswerPair = (args: {
  newPair: QuestionAnswerPair;
  index: number;
}) => void;

type PersonalPerspectiveState = {
  questionAnswerPairs: QuestionAnswerPair[];
  updateQuestionAnswerPair: UpdateQuestionAnswerPair;
};

export const usePersonalPerspectiveStore = create<PersonalPerspectiveState>()(
  devtools((set, get) => ({
    questionAnswerPairs: [
      { questionValue: 'favoriteFood', answer: '' },
      { questionValue: 'nonNegotiable', answer: '' },
      { questionValue: 'favoritePlaceLived', answer: '' },
    ],
    updateQuestionAnswerPair: ({ newPair, index }) => {
      const { questionAnswerPairs } = get();
      const newPairs = [...questionAnswerPairs];
      newPairs[index] = newPair;

      set({ questionAnswerPairs: newPairs });
    },
  })),
);
