'use client';

import React, { ChangeEvent, ComponentProps, useEffect } from 'react';

import TextField from '@mui/material/TextField';

import { QuestionsGroupWrapper } from '@/features/Form/QuestionsGroupWrapper';
import { useDataLayer } from '@/hooks';
import { useOverviewStore } from '@/store';

import { DatePicker } from './DatePicker';

type OverviewQuestionsGroupProps = {
  dateOfBirth: ComponentProps<typeof DatePicker>;
  occupation: ComponentProps<typeof TextField>;
  location: ComponentProps<typeof TextField>;
};

export function OverviewQuestionsGroupDOMComponent({
  dateOfBirth,
  occupation,
  location,
}: OverviewQuestionsGroupProps) {
  return (
    <QuestionsGroupWrapper groupName="あなたについて">
      <DatePicker {...dateOfBirth} />
      <TextField
        label="何してる人？？"
        variant="outlined"
        fullWidth
        InputProps={{
          autoComplete: 'organization-title',
          name: 'organization-title',
        }}
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
  const dataLayer = useDataLayer({
    componentName: 'OverviewQuestionsGroup',
  });

  useEffect(() => {
    void useOverviewStore.persist.rehydrate();
  }, []);

  const { DOB, occupation, location, setDOB, setOccupation, setLocation } =
    useOverviewStore();

  const handleChangeDOB = (value: string) => {
    setDOB(value);
  };
  const handleChangeOccupation = (e: ChangeEvent<HTMLInputElement>) => {
    setOccupation(e.target.value);
  };
  const handleChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleBlurOccupation = () => {
    dataLayer.pushEvent('blurOccupation', {
      occupationLength: occupation.length,
    });
  };

  const handleBlurLocation = () => {
    dataLayer.pushEvent('blurLocation', {
      locationLength: location.length,
    });
  };

  return (
    <OverviewQuestionsGroupDOMComponent
      dateOfBirth={{
        label: 'お誕生日',
        value: DOB,
        onChange: handleChangeDOB,
      }}
      occupation={{
        value: occupation,
        onChange: handleChangeOccupation,
        onBlur: handleBlurOccupation,
      }}
      location={{
        value: location,
        onChange: handleChangeLocation,
        onBlur: handleBlurLocation,
      }}
    />
  );
}
