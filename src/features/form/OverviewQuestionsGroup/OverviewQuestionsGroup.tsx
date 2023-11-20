'use client';

import React, { ChangeEvent } from 'react';

import TextField from '@mui/material/TextField';

import { QuestionsGroupWrapper } from '@/features/Form/QuestionsGroupWrapper';
import { useOverviewStore } from '@/store';

import { DateOfBirth, DateOfBirthProps } from './DateOfBirth';

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

export function OverviewQuestionsGroup() {
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
      occupation={{ value: occupation, onChange: onChangeOccupation }}
      location={{ value: location, onChange: onChangeLocation }}
    />
  );
}
