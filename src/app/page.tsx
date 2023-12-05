'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Form } from '@/features/Form';
import { ProfileSheet } from '@/features/ProfileSheet';
import { useAppStore } from '@/store';

export default function HomePage() {
  const theme = useTheme();
  const { showPreview } = useAppStore();
  const isPC = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box display="grid" gridTemplateColumns="1fr auto" gap={2}>
      {(isPC || !showPreview) && <Form />}
      {(isPC || showPreview) && <ProfileSheet />}
    </Box>
  );
}
