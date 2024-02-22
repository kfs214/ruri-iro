'use client';

import React, { ChangeEvent, ComponentProps, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import { Dayjs } from 'dayjs';

import { QuestionsGroupWrapper } from '@/features/Form/QuestionsGroupWrapper';
import { useDataLayer } from '@/hooks';
import { useOverviewStore } from '@/store';

import { DateOfBirth, DateOfBirthProps } from './DateOfBirth';

type OverviewQuestionsGroupProps = {
  dateOfBirth: DateOfBirthProps;
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
  const dataLayer = useDataLayer({
    componentName: 'OverviewQuestionsGroup',
  });

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
    dataLayer.pushEvent('changeIsCustomDOBEnabled', {
      isCustomDOBEnabled: e.target.checked,
    });
  };

  const handleChangeCustomDOB = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomDOB(e.target.value);
  };
  const handleChangeDayjsDOB = (value: Dayjs | null) => {
    setDayjsDOB(value);
  };
  const handleChangeOccupation = (e: ChangeEvent<HTMLInputElement>) => {
    setOccupation(e.target.value);
  };
  const handleChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const onBlurOccupation = () => {
    dataLayer.pushEvent('blurOccupation', {
      occupationLength: occupation.length,
    });
  };

  const onBlurLocation = () => {
    dataLayer.pushEvent('blurLocation', {
      locationLength: location.length,
    });
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
      occupation={{
        value: occupation,
        onChange: handleChangeOccupation,
        onBlur: onBlurOccupation,
      }}
      location={{
        value: location,
        onChange: handleChangeLocation,
        onBlur: onBlurLocation,
      }}
    />
  );
}
