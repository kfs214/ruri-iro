'use client';

import * as React from 'react';

import Box from '@mui/material/Box';

import { Form } from '@/features/Form';
import { ProfileSheet } from '@/features/ProfileSheet';
import { useLayout } from '@/hooks';
import { useAppStore } from '@/store';

export default function HomePage() {
  const { isPC } = useLayout();
  const { showPreview } = useAppStore();

  return (
    <Box display="grid" gridTemplateColumns="1fr auto" gap={2}>
      {(isPC || !showPreview) && <Form />}
      {(isPC || showPreview) && <ProfileSheet />}
    </Box>
  );
}
