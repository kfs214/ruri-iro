import { ChangeEvent, ComponentProps, useCallback, useState } from 'react';

import EventIcon from '@mui/icons-material/Event';
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
    <Modal keepMounted {...ModalProps}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <StaticDatePicker
          views={['year', 'month', 'day']}
          sx={{ maxWidth: '320px' }}
          slotProps={{
            actionBar: { actions: ['accept'] },
          }}
          {...PickerProps}
        />
      </Box>
    </Modal>
  );
}

export function DatePicker({
  onChange,
  ...restProps
}: Omit<ComponentProps<typeof TextField>, 'onChange'> & {
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

  // TODO 変更がない場合も閉じる
  const handleAcceptDate = useCallback(
    (value: Dayjs | null) => {
      if (value) {
        onChange(value.format('YYYY年MM月DD日（dddd）'));
      }

      setIsModalOpen(false);
    },
    [onChange],
  );
  return (
    <>
      <TextField
        fullWidth
        {...restProps}
        onChange={handleChangeTextField}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickCalendarIcon}>
                <EventIcon />
              </IconButton>
            </InputAdornment>
          ),
          autoComplete: 'bday',
          name: 'bday',
        }}
      />
      <PickerModal
        ModalProps={{ open: isModalOpen, onClose: handleCloseModal }}
        PickerProps={{ onAccept: handleAcceptDate }}
      />
    </>
  );
}
