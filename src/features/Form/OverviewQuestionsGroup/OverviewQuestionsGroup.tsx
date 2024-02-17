'use client';

import React, { ChangeEvent, useEffect } from 'react';

import TextField from '@mui/material/TextField';

import { QuestionsGroupWrapper } from '@/features/Form/QuestionsGroupWrapper';
import { useOverviewStore } from '@/store';

import { DateOfBirth, DateOfBirthProps } from './DateOfBirth';

type OverviewQuestionsGroupProps = {
  dateOfBirth: DateOfBirthProps;
  occupation: {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  location: {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
};

export function OverviewQuestionsGroupDOMComponent({
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
        {...occupation}
      />
      <TextField
        label="どこの人？？"
        variant="outlined"
        fullWidth
        {...location}
      />
    </QuestionsGroupWrapper>
  );
}

export function OverviewQuestionsGroup() {
  useEffect(() => {
    useOverviewStore.persist.rehydrate();
  }, []);

  const {
    isCustomDOBEnabled,
    handleChangeIsCustomDOBEnabled,
    customDOB,
    handleOnChangeCustomDOB,
    dayjsDOB,
    handleOnChangeDayjsDOB,
    occupation,
    onChangeOccupation,
    location,
    onChangeLocation,
  } = useOverviewStore();

  return (
    <OverviewQuestionsGroupDOMComponent
      dateOfBirth={{
        label: 'お誕生日',
        isCustomDOBEnabled,
        handleChangeIsCustomDOBEnabled,
        customDOB: { value: customDOB, onChange: handleOnChangeCustomDOB },
        dayjsDOB: { value: dayjsDOB, onChange: handleOnChangeDayjsDOB },
      }}
      // TODO モニタリング
      occupation={{ value: occupation, onChange: onChangeOccupation }}
      location={{ value: location, onChange: onChangeLocation }}
    />
  );
}
