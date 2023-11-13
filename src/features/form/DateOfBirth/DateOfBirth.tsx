import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import React, { ChangeEvent } from 'react';

type CustomDOBProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

type DayjsDOBProps = {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
};

export type DateOfBirthProps = {
  isCustomDOBEnabled: boolean;
  handleChangeIsCustomDOBEnabled: (e: ChangeEvent<HTMLInputElement>) => void;
  customDOB: CustomDOBProps;
  dayjsDOB: DayjsDOBProps;
};

export function DateOfBirth(params: DateOfBirthProps) {
  const {
    isCustomDOBEnabled,
    handleChangeIsCustomDOBEnabled,
    customDOB,
    dayjsDOB,
  } = params;

  return (
    <>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={isCustomDOBEnabled}
              onChange={handleChangeIsCustomDOBEnabled}
            />
          }
          label="お誕生日を自由記述で設定する"
        />
      </Box>

      {isCustomDOBEnabled && (
        <TextField
          label="お誕生日"
          variant="outlined"
          margin="normal"
          value={customDOB.value}
          onChange={customDOB.onChange}
          fullWidth
        />
      )}
      {!isCustomDOBEnabled && (
        <DatePicker
          label="お誕生日"
          value={dayjsDOB.value}
          onChange={dayjsDOB.onChange}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: 'normal',
            },
          }}
        />
      )}
    </>
  );
}
