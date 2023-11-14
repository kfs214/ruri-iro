import TextField from '@mui/material/TextField';
import React, { ChangeEvent } from 'react';
import { DateOfBirth, DateOfBirthProps } from './DateOfBirth';
import { QuestionsGroupWrapper } from '@/features/form/QuestionsGroupWrapper';

type OverviewQuestionsGroupProps = {
  dateOfBirth: DateOfBirthProps;
  occupation: {
    value?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  location: {
    value?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
};

export function OverviewQuestionsGroup({
  dateOfBirth,
  occupation,
  location,
}: OverviewQuestionsGroupProps) {
  return (
    <QuestionsGroupWrapper groupName="あなたについて">
      <DateOfBirth {...dateOfBirth} />
      <TextField
        label="何してる人？？"
        variant="outlined"
        fullWidth
        margin="normal"
        {...occupation}
      />
      <TextField
        label="どこの人？？"
        variant="outlined"
        fullWidth
        margin="normal"
        {...location}
      />
    </QuestionsGroupWrapper>
  );
}
