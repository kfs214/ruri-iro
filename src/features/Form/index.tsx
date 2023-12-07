import React from 'react';

import Box from '@mui/material/Box';

import { ImageGroup } from './ImageGroup';
import { NameInputGroup } from './NameInputGroup';
import { OverviewQuestionsGroup } from './OverviewQuestionsGroup';

export function Form() {
  return (
    <Box display="grid" gap={3}>
      <NameInputGroup />
      <OverviewQuestionsGroup />
      <ImageGroup />
    </Box>
  );
}
