'use client';

import React, { useState } from 'react';

import TextField from '@mui/material/TextField';

import { QuestionsGroupWrapper } from '@/features/Form/QuestionsGroupWrapper';
import { useNameStore } from '@/store';

type NameInputGroupProps = {
  fullName: Partial<typeof TextField>;
  preferredName: Partial<typeof TextField>;
};

export function NameInputGroupDOMComponent({
  fullName,
  preferredName,
}: NameInputGroupProps) {
  return (
    <QuestionsGroupWrapper groupName="お名前">
      <TextField
        label="お名前"
        variant="outlined"
        fullWidth
        required
        {...fullName}
      />
      <TextField
        label="なんて呼ばれてる？？"
        variant="outlined"
        fullWidth
        {...preferredName}
      />
    </QuestionsGroupWrapper>
  );
}

export function NameInputGroup() {
  const { fullName, onChangeFullName, preferredName, onChangePreferredName } =
    useNameStore();
  const [hasFullNameError, setHasFullNameError] = useState(false);

  const handleChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasFullNameError(!e.target.value);
    onChangeFullName(e);
  };

  const handleBlurFullName = (e: React.FocusEvent<HTMLInputElement>) => {
    setHasFullNameError(!e.target.value);
  };

  return (
    <NameInputGroupDOMComponent
      fullName={{
        value: fullName,
        error: hasFullNameError,
        onChange: handleChangeFullName,
        onBlur: handleBlurFullName,
      }}
      preferredName={{
        value: preferredName,
        onChange: onChangePreferredName,
      }}
    />
  );
}
