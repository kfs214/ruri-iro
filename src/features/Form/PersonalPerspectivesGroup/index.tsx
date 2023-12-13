import { ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { questions } from '@/const';
import { usePersonalPerspectiveStore } from '@/store';

import { QuestionsGroupWrapper } from '../QuestionsGroupWrapper';

function QuestionAnswerPair({
  index,
  questionValue,
  answer,
}: {
  index: number;
  questionValue: string;
  answer: string;
}) {
  const { updateQuestionAnswerPair } = usePersonalPerspectiveStore();

  // TODO 質問と回答の組み合わせを保持するか検討
  const handleChangeQuestion = (e: SelectChangeEvent) => {
    const { value } = e.target;
    updateQuestionAnswerPair({
      index,
      newPair: { questionValue: value, answer: '' },
    });
  };

  const handleChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateQuestionAnswerPair({
      index,
      newPair: { questionValue, answer: value },
    });
  };

  // TODO 質問の枠線がラベルに重なる
  return (
    <Box display="grid" gap={2}>
      <FormControl fullWidth>
        <InputLabel>{`質問${index + 1}`}</InputLabel>
        <Select value={questionValue} onChange={handleChangeQuestion}>
          {questions.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label={`回答${index + 1}`}
        variant="outlined"
        fullWidth
        value={answer}
        onChange={handleChangeAnswer}
      />
    </Box>
  );
}

export function PersonalPerspectivesGroup() {
  const { questionAnswerPairs } = usePersonalPerspectiveStore();

  return (
    <QuestionsGroupWrapper groupName="三問三答">
      {questionAnswerPairs.map(({ questionValue, answer }, index) => (
        <QuestionAnswerPair
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          index={index}
          questionValue={questionValue}
          answer={answer}
        />
      ))}
    </QuestionsGroupWrapper>
  );
}
