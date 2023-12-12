import React from 'react';

import Box from '@mui/material/Box';

import { ImageGroup } from './ImageGroup';
import { NameInputGroup } from './NameInputGroup';
import { OverviewQuestionsGroup } from './OverviewQuestionsGroup';
import TagGroup from './TagGroup';

export function Form() {
  return (
    <Box display="grid" gap={3}>
      <ImageGroup />
      <NameInputGroup />
      <OverviewQuestionsGroup />
      <TagGroup />
    </Box>
  );
}
