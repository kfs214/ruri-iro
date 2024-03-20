import { ChangeEvent, ComponentProps, useCallback, useState } from 'react';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Dayjs } from 'dayjs';

function PickerModal({
  ModalProps,
  PickerProps,
}: {
  ModalProps: Omit<ComponentProps<typeof Modal>, 'children'>;
  PickerProps?: ComponentProps<typeof StaticDatePicker<Dayjs>>;
}) {
  return (
    <Modal {...ModalProps}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <StaticDatePicker sx={{ maxWidth: '320px' }} {...PickerProps} />
      </Box>
    </Modal>
  );
}

export function DatePicker({
  TextFieldProps,
  onChange,
}: {
  TextFieldProps: Omit<ComponentProps<typeof TextField>, 'onChange'>;
  onChange: (value: string) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickCalendarIcon = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  const handleChangeTextField = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );
  const handleAcceptDate = useCallback(
    (value: Dayjs | null) => {
      if (!value) return;
      onChange(value.format('YYYY年MM月DD日（dddd）'));
    },
    [onChange],
  );

  return (
    <>
      <TextField
        fullWidth
        {...TextFieldProps}
        onChange={handleChangeTextField}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickCalendarIcon}>
                <CalendarMonthIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <PickerModal
        ModalProps={{ open: isModalOpen, onClose: handleCloseModal }}
        PickerProps={{ onAccept: handleAcceptDate }}
      />
    </>
  );
}
