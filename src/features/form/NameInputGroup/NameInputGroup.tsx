import TextField from '@mui/material/TextField';
import React, { ChangeEvent } from 'react';
import { QuestionsGroupWrapper } from '@/features/form/QuestionsGroupWrapper';

type NameInputGroupProps = {
  fullName: {
    value?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  preferredName: {
    value?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
};

export function NameInputGroup({
  fullName,
  preferredName,
}: NameInputGroupProps) {
  return (
    <QuestionsGroupWrapper groupName="お名前">
      <TextField
        label="お名前"
        variant="outlined"
        fullWidth
        margin="normal"
        {...fullName}
      />
      <TextField
        label="なんて呼ばれてる？？"
        variant="outlined"
        fullWidth
        margin="normal"
        {...preferredName}
      />
    </QuestionsGroupWrapper>
  );
}
