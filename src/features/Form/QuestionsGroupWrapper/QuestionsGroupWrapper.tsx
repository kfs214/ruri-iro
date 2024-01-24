import React, { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = {
  groupName: string;
  children: ReactNode;
};

export function QuestionsGroupWrapper({ groupName, children }: Props) {
  return (
    <Box>
      <Typography variant="h4">{groupName}</Typography>
      <Box display="grid" gap={2} mt={2} gridTemplateColumns="minmax(0,1fr)">
        {children}
      </Box>
    </Box>
  );
}
