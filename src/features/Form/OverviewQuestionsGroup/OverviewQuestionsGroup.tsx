'use client';

import React, { ChangeEvent, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

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
    customDOB,
    dayjsDOB,
    occupation,
    location,
    setIsCustomDOBEnabled,
    setCustomDOB,
    setDayjsDOB,
    setOccupation,
    setLocation,
  } = useOverviewStore();

  const handleChangeIsCustomDOBEnabled = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCustomDOBEnabled(e.target.checked);
  };

  const handleChangeCustomDOB = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomDOB(e.target.value);
  };
  const handleChangeDayjsDOB = (newValue: dayjs.Dayjs | null) => {
    setDayjsDOB(newValue);
  };
  const handleChangeOccupation = (e: ChangeEvent<HTMLInputElement>) => {
    setOccupation(e.target.value);
  };
  const handleChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  return (
    <OverviewQuestionsGroupDOMComponent
      dateOfBirth={{
        label: 'お誕生日',
        isCustomDOBEnabled,
        handleChangeIsCustomDOBEnabled,
        customDOB: { value: customDOB, onChange: handleChangeCustomDOB },
        dayjsDOB: { value: dayjsDOB, onChange: handleChangeDayjsDOB },
      }}
      // TODO モニタリング
      occupation={{ value: occupation, onChange: handleChangeOccupation }}
      location={{ value: location, onChange: handleChangeLocation }}
    />
  );
}
