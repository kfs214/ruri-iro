import React, { ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

import { useDataLayer } from '@/hooks';

type CustomDOBProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

type DayjsDOBProps = {
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
};

export type DateOfBirthProps = {
  label: string;
  isCustomDOBEnabled: boolean;
  handleChangeIsCustomDOBEnabled: (e: ChangeEvent<HTMLInputElement>) => void;
  customDOB: CustomDOBProps;
  dayjsDOB: DayjsDOBProps;
};

export function DateOfBirth(props: DateOfBirthProps) {
  const {
    label,
    isCustomDOBEnabled,
    handleChangeIsCustomDOBEnabled,
    customDOB,
    dayjsDOB,
  } = props;

  const dataLayer = useDataLayer({ componentName: 'DateOfBirth' });

  const handleBlurCustomDOB = () => {
    dataLayer.pushEvent('blurCustomDOB', {
      customDOBLength: customDOB.value.length,
    });
  };

  const handleChangeDayjsDOB = (value: Dayjs | null): void => {
    dayjsDOB.onChange(value);
    dataLayer.pushEvent('changeDayjsDOB');
  };

  return (
    <Box>
      {isCustomDOBEnabled && (
        <TextField
          label={label}
          variant="outlined"
          value={customDOB.value}
          onChange={customDOB.onChange}
          onBlur={handleBlurCustomDOB}
          fullWidth
        />
      )}
      {!isCustomDOBEnabled && (
        <DatePicker
          label={label}
          value={dayjsDOB.value}
          onChange={handleChangeDayjsDOB}
          slotProps={{
            textField: {
              fullWidth: true,
            },
          }}
        />
      )}
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={isCustomDOBEnabled}
              // TODO モニタリング
              onChange={handleChangeIsCustomDOBEnabled}
            />
          }
          label="お誕生日を自由記述で設定する"
        />
      </Box>
    </Box>
  );
}
