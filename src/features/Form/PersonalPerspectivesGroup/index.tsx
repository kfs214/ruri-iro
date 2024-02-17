import { ChangeEvent, useEffect } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { questions } from '@/const';
import { useDataLayer } from '@/hooks';
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

  const dataLayer = useDataLayer({
    componentName: 'PersonalPerspectivesGroup',
  });

  // TODO 質問と回答の組み合わせを保持するか検討
  const handleChangeQuestion = (e: SelectChangeEvent) => {
    const { value } = e.target;
    updateQuestionAnswerPair({
      index,
      newPair: { questionValue: value, answer: '' },
    });

    dataLayer.pushEvent('changeQuestion', { questionValue: value });
  };

  const handleChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateQuestionAnswerPair({
      index,
      newPair: { questionValue, answer: value },
    });

    // TODO この時の問いもモニタリング送信
    dataLayer.pushEvent('changeAnswer', { answerValueLength: value.length });
  };

  // TODO indexでexportするようにした方がファイル名で中身がわかりやすい
  // TODO height: min-contentを各Gridに適用。自分より大きい要素があったときに伸びるので。その懸念がある箇所全て
  return (
    <Box display="grid" gap={2}>
      <FormControl fullWidth>
        <InputLabel>{`質問${index + 1}`}</InputLabel>
        <Select
          value={questionValue}
          onChange={handleChangeQuestion}
          label={`質問${index + 1}`}
        >
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
        multiline
        rows={3}
        value={answer}
        onChange={handleChangeAnswer}
      />
    </Box>
  );
}

export function PersonalPerspectivesGroup() {
  const { questionAnswerPairs } = usePersonalPerspectiveStore();

  useEffect(() => {
    usePersonalPerspectiveStore.persist.rehydrate();
  }, []);

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
