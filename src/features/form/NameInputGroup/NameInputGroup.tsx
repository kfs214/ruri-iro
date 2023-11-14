import TextField from '@mui/material/TextField';
import React, { ChangeEvent } from 'react';
import { QuestionsGroupWrapper } from '@/features/form/QuestionsGroupWrapper';

type NameInputGroupProps = {
  fullName: {
    value: string;
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
  // TODO お名前が空欄のときの振る舞い
  return (
    <QuestionsGroupWrapper groupName="お名前">
      <TextField
        label="お名前"
        variant="outlined"
        fullWidth
        required
        margin="normal"
        // error={!fullName.value}
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
