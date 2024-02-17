'use client';

import React, { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';

import { QuestionsGroupWrapper } from '@/features/Form/QuestionsGroupWrapper';
import { useDataLayer } from '@/hooks';
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

// TODO オートコンプリート
export function NameInputGroup() {
  const { fullName, onChangeFullName, preferredName, onChangePreferredName } =
    useNameStore();
  const [hasFullNameError, setHasFullNameError] = useState(false);
  const dataLayer = useDataLayer({ componentName: 'NameInputGroup' });

  // TODO rehydrateここなのか？
  useEffect(() => {
    useNameStore.persist.rehydrate();
  }, []);

  const handleChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasFullNameError(!e.target.value);
    onChangeFullName(e);
  };

  const handleBlurFullName = (e: React.FocusEvent<HTMLInputElement>) => {
    setHasFullNameError(!e.target.value);
    dataLayer.pushEvent('blurFullName', {
      fullNameLength: e.target.value.length,
    });
  };

  const handleBlurPreferredName = (e: React.FocusEvent<HTMLInputElement>) => {
    dataLayer.pushEvent('blurPreferredName', {
      preferredNameLength: e.target.value.length,
    });
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
        onBlur: handleBlurPreferredName,
      }}
    />
  );
}
